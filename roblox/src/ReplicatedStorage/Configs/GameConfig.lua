local GameConfig = {}

GameConfig.Player = {
	WalkSpeed = 22,
	JumpPower = 58,
	MaxHealth = 160,
	FlightSpeed = 72,
}

GameConfig.Actions = {
	Melee = {
		Damage = 28,
		Range = 12,
		Cooldown = 0.35,
	},
	HandBolt = {
		Damage = 36,
		Speed = 150,
		LifeTime = 2.2,
		Cooldown = 0.18,
	},
	GroundSlam = {
		Damage = 48,
		Radius = 22,
		Cooldown = 3,
	},
	ArcaneBurst = {
		Damage = 18,
		Radius = 34,
		Cooldown = 4.5,
	},
}

GameConfig.World = {
	Spawn = Vector3.new(0, 8, 0),
	Board = {
		Seed = 20061,
		Size = 360,
		CoordinateScale = 2.5,
		ForestCount = 180,
		HouseCount = 24,
		Colors = {
			Grass = Color3.fromRGB(168, 201, 138),
			Road = Color3.fromRGB(216, 207, 179),
			Water = Color3.fromRGB(100, 181, 210),
			Rock = Color3.fromRGB(129, 145, 120),
		},
		Water = {
			Position = {
				-92,
				88,
			},
			Radius = 30,
		},
		Pois = {
			{ Id = "eastbrook", Name = "Eastbrook", Kind = "hub", Position = { 0, 0 } },
			{ Id = "crossroads-market", Name = "Crossroads Market", Kind = "hub", Position = { 30, 3 } },
			{ Id = "wolf-run", Name = "Wolf Run", Kind = "danger", Position = { -2, 70 } },
			{ Id = "boar-meadow", Name = "Boar Meadow", Kind = "poi", Position = { 65, 0 } },
			{ Id = "mirror-lake", Name = "Mirror Lake", Kind = "poi", Position = { -88, 82 } },
			{ Id = "bandit-camp", Name = "Bandit Camp", Kind = "danger", Position = { 76, -76 } },
			{ Id = "fallen-chapel", Name = "Fallen Chapel", Kind = "danger", Position = { 80, 80 } },
			{ Id = "copper-dig", Name = "Copper Dig", Kind = "camp", Position = { -84, -64 } },
			{ Id = "webwood", Name = "Webwood", Kind = "poi", Position = { -60, 4 } },
			{ Id = "graveyard", Name = "Graveyard", Kind = "camp", Position = { -12, -14 } },
		},
		Roads = {
			{ { 0, 0 }, { -2, 35 }, { -2, 70 } },
			{ { 0, 0 }, { 16, 2 }, { 30, 3 }, { 65, 0 } },
			{ { 0, 0 }, { 38, -38 }, { 76, -76 } },
			{ { 0, 0 }, { -44, 41 }, { -88, 82 } },
			{ { 0, 0 }, { -42, -32 }, { -84, -64 } },
			{ { 0, 0 }, { 40, 40 }, { 80, 80 } },
			{ { 0, 0 }, { -20, -10 }, { -12, -14 } },
		},
	},
	Buildings = {
		{
			Id = "kellogg-foundation",
			Name = "W.K. Kellogg Foundation",
			Position = Vector3.new(-44, 0, -28),
			Color = Color3.fromRGB(46, 111, 92),
		},
		{
			Id = "food-reimagined",
			Name = "BC Food Reimagined",
			Position = Vector3.new(74, 0, 16),
			Color = Color3.fromRGB(198, 123, 42),
		},
		{
			Id = "gvsu-innovation",
			Name = "Grand Valley State University Battle Creek Innovation Hub",
			Position = Vector3.new(122, 0, 78),
			Color = Color3.fromRGB(28, 92, 154),
		},
		{
			Id = "medc",
			Name = "Michigan Economic Development Corporation",
			Position = Vector3.new(-96, 0, -108),
			Color = Color3.fromRGB(75, 91, 158),
		},
		{
			Id = "battle-creek-unlimited",
			Name = "Battle Creek Unlimited",
			Position = Vector3.new(152, 0, -126),
			Color = Color3.fromRGB(130, 68, 158),
		},
	},
	Collectibles = {
		{ Name = "Arcane Charge", Position = Vector3.new(-35, 3, 44), Color = Color3.fromRGB(70, 215, 255) },
		{ Name = "Flight Rune", Position = Vector3.new(48, 3, -48), Color = Color3.fromRGB(255, 214, 88) },
		{ Name = "Health Spark", Position = Vector3.new(112, 3, 112), Color = Color3.fromRGB(70, 230, 130) },
		{ Name = "Power Core", Position = Vector3.new(-150, 3, 18), Color = Color3.fromRGB(255, 90, 150) },
	},
	ObstacleCourse = {
		{
			Name = "Balance Beam",
			Position = Vector3.new(35, 3, -92),
			Size = Vector3.new(70, 2, 6),
			Color = Color3.fromRGB(145, 95, 42),
		},
		{
			Name = "Jump Block A",
			Position = Vector3.new(70, 4, -118),
			Size = Vector3.new(14, 8, 14),
			Color = Color3.fromRGB(99, 112, 126),
		},
		{
			Name = "Jump Block B",
			Position = Vector3.new(98, 7, -142),
			Size = Vector3.new(14, 14, 14),
			Color = Color3.fromRGB(99, 112, 126),
		},
		{
			Name = "Sky Bridge",
			Position = Vector3.new(132, 11, -166),
			Size = Vector3.new(60, 3, 10),
			Color = Color3.fromRGB(105, 74, 48),
		},
	},
	Zones = {
		{
			Name = "Eastbrook",
			Position = Vector3.new(0, 0, 0),
			Color = Color3.fromRGB(86, 136, 76),
		},
		{
			Name = "Mirror Lake",
			Position = Vector3.new(-105, 0, 82),
			Color = Color3.fromRGB(62, 132, 170),
		},
		{
			Name = "Bandit Camp",
			Position = Vector3.new(88, 0, -72),
			Color = Color3.fromRGB(132, 84, 54),
		},
		{
			Name = "Fallen Chapel",
			Position = Vector3.new(92, 0, 88),
			Color = Color3.fromRGB(118, 118, 126),
		},
		{
			Name = "Webwood",
			Position = Vector3.new(-72, 0, 4),
			Color = Color3.fromRGB(66, 74, 58),
		},
	},
}

GameConfig.Enemies = {
	{
		Name = "Forest Wolf",
		Kind = "beast",
		Count = 7,
		Center = Vector3.new(-5, 4, 175),
		Spread = 30,
		Health = 75,
		Damage = 11,
		Speed = 17,
		Color = Color3.fromRGB(118, 132, 136),
	},
	{
		Name = "Vale Bandit",
		Kind = "humanoid",
		Count = 7,
		Center = Vector3.new(190, 4, -190),
		Spread = 34,
		Health = 95,
		Damage = 15,
		Speed = 15,
		Color = Color3.fromRGB(148, 49, 38),
	},
	{
		Name = "Restless Bones",
		Kind = "undead",
		Count = 6,
		Center = Vector3.new(200, 4, 200),
		Spread = 30,
		Health = 105,
		Damage = 17,
		Speed = 13,
		Color = Color3.fromRGB(214, 219, 219),
	},
	{
		Name = "Webwood Lurker",
		Kind = "spider",
		Count = 6,
		Center = Vector3.new(-150, 4, 10),
		Spread = 28,
		Health = 85,
		Damage = 13,
		Speed = 16,
		Color = Color3.fromRGB(74, 35, 90),
	},
	{
		Name = "Gorrak the Ruthless",
		Kind = "boss",
		Count = 1,
		Center = Vector3.new(235, 5, -235),
		Spread = 1,
		Health = 420,
		Damage = 26,
		Speed = 14,
		Color = Color3.fromRGB(96, 48, 28),
		Scale = 1.45,
	},
}

return GameConfig
