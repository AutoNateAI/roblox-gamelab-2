local ContextActionService = game:GetService("ContextActionService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local UserInputService = game:GetService("UserInputService")
local Workspace = game:GetService("Workspace")

local Config = require(ReplicatedStorage:WaitForChild("Configs"):WaitForChild("GameConfig"))
local remotes = ReplicatedStorage:WaitForChild("ActionRemotes")
local actionEvent = remotes:WaitForChild("ActionEvent")
local flightEvent = remotes:WaitForChild("FlightEvent")

local player = Players.LocalPlayer
local camera = Workspace.CurrentCamera

local yaw = math.rad(180)
local pitch = math.rad(-18)
local cameraDistance = 22
local cameraHeight = 6
local flying = false
local keysDown = {}
local lastFlightSync = 0

local function getCharacterParts()
	local character = player.Character
	if not character then
		return nil, nil, nil
	end

	local humanoid = character:FindFirstChildOfClass("Humanoid")
	local root = character:FindFirstChild("HumanoidRootPart")
	return character, humanoid, root
end

local function cameraBasis()
	local flatLook = Vector3.new(math.sin(yaw), 0, math.cos(yaw))
	local flatRight = Vector3.new(math.cos(yaw), 0, -math.sin(yaw))
	return flatLook.Unit, flatRight.Unit
end

local function getMoveVector()
	local forward, right = cameraBasis()
	local move = Vector3.zero

	if keysDown[Enum.KeyCode.W] then
		move += forward
	end
	if keysDown[Enum.KeyCode.S] then
		move -= forward
	end
	if keysDown[Enum.KeyCode.D] then
		move += right
	end
	if keysDown[Enum.KeyCode.A] then
		move -= right
	end
	if flying and keysDown[Enum.KeyCode.Space] then
		move += Vector3.yAxis
	end
	if flying and keysDown[Enum.KeyCode.LeftShift] then
		move -= Vector3.yAxis
	end

	return move.Magnitude > 1 and move.Unit or move
end

local function aimDirection()
	local _, _, root = getCharacterParts()
	if not root then
		local look = camera.CFrame.LookVector
		return look.Magnitude > 0 and look.Unit or Vector3.new(0, 0, -1)
	end

	local look = camera.CFrame.LookVector
	if math.abs(look.Y) > 0.92 then
		look = root.CFrame.LookVector
	end
	return look.Unit
end

local function fireAction(actionName)
	actionEvent:FireServer(actionName, aimDirection())
end

local function setFlying(enabled)
	flying = enabled
	local _, humanoid = getCharacterParts()
	if humanoid then
		humanoid.PlatformStand = enabled
		humanoid.AutoRotate = not enabled
	end
	flightEvent:FireServer(flying, getMoveVector())
end

local function bindAction(name, callback, ...)
	ContextActionService:BindAction(name, function(_, inputState)
		if inputState == Enum.UserInputState.Begin then
			callback()
		end
		return Enum.ContextActionResult.Sink
	end, false, ...)
end

bindAction("ArenaMelee", function()
	fireAction("Melee")
end, Enum.KeyCode.J)

bindAction("ArenaBolt", function()
	fireAction("HandBolt")
end, Enum.KeyCode.K)

bindAction("ArenaFlight", function()
	setFlying(not flying)
end, Enum.KeyCode.L)

bindAction("ArenaSlam", function()
	fireAction("GroundSlam")
end, Enum.KeyCode.U)

bindAction("ArenaBurst", function()
	fireAction("ArcaneBurst")
end, Enum.KeyCode.I)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then
		return
	end
	keysDown[input.KeyCode] = true
end)

UserInputService.InputEnded:Connect(function(input)
	keysDown[input.KeyCode] = nil
end)

player.CharacterAdded:Connect(function()
	flying = false
	table.clear(keysDown)
	task.wait(0.2)
	local _, humanoid = getCharacterParts()
	if humanoid then
		humanoid.WalkSpeed = Config.Player.WalkSpeed
		humanoid.JumpPower = Config.Player.JumpPower
	end
end)

RunService.RenderStepped:Connect(function(dt)
	camera.CameraType = Enum.CameraType.Scriptable

	if keysDown[Enum.KeyCode.Left] then
		yaw += dt * 2.35
	end
	if keysDown[Enum.KeyCode.Right] then
		yaw -= dt * 2.35
	end
	if keysDown[Enum.KeyCode.Up] then
		pitch = math.clamp(pitch + dt * 1.55, math.rad(-60), math.rad(30))
	end
	if keysDown[Enum.KeyCode.Down] then
		pitch = math.clamp(pitch - dt * 1.55, math.rad(-60), math.rad(30))
	end

	local _, humanoid, root = getCharacterParts()
	if not root then
		return
	end

	local forward, right = cameraBasis()
	if humanoid and not flying then
		local move = getMoveVector()
		humanoid:Move(move, false)
		if move.Magnitude > 0.05 then
			root.CFrame = CFrame.lookAt(root.Position, root.Position + move)
		end
	end

	if flying then
		local move = getMoveVector()
		if move.Magnitude > 0.05 then
			local flatMove = Vector3.new(move.X, 0, move.Z)
			if flatMove.Magnitude > 0.05 then
				root.CFrame = CFrame.lookAt(root.Position, root.Position + flatMove.Unit)
			end
		end
		if os.clock() - lastFlightSync > 0.04 then
			lastFlightSync = os.clock()
			flightEvent:FireServer(true, move)
		end
	end

	local focus = root.Position + Vector3.new(0, cameraHeight, 0)
	local pitchOffset = Vector3.new(0, math.sin(-pitch) * cameraDistance, 0)
	local backOffset = -forward * (math.cos(pitch) * cameraDistance)
	local cameraPosition = focus + backOffset + pitchOffset
	camera.CFrame = CFrame.lookAt(cameraPosition, focus + forward * 10)

	local _ = right
end)
