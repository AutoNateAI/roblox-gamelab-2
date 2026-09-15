# AutoNateAI Social Distribution Setup

This repo can publish reviewed research links to Facebook Pages and LinkedIn from a local CLI script:

```bash
npm run marketplace:social:post -- --platform facebook --message "Test post" --link "https://autonateai.com/research-and-case-studies"
```

The command is a dry run by default. Add `--confirm` only when you are ready to publish:

```bash
npm run marketplace:social:post -- --platform facebook --message "Test post" --link "https://autonateai.com/research-and-case-studies" --confirm
```

## Credentials

Store credentials in the root `.env` file. Do not commit `.env`, screenshots, or logs containing tokens.

```bash
FACEBOOK_PAGE_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=

LINKEDIN_ACCESS_TOKEN=
LINKEDIN_PERSON_ID=
LINKEDIN_ORGANIZATION_ID=
LINKEDIN_AUTHOR_URN=
LINKEDIN_VERSION=202605
```

For the current LinkedIn workflow, the post author is Nathan's personal/member profile. The script can usually discover the person author from a token that has `openid` + `profile`.

Optional explicit author values:

```bash
LINKEDIN_PERSON_ID=YOUR_LINKEDIN_API_PERSON_ID
LINKEDIN_AUTHOR_URN=urn:li:person:YOUR_LINKEDIN_API_PERSON_ID
```

For a future company Page workflow, use either `LINKEDIN_ORGANIZATION_ID` or an organization `LINKEDIN_AUTHOR_URN`:

```text
urn:li:organization:YOUR_ORGANIZATION_ID
```

## Facebook Page Requirements

This follows the Well Nest pattern in `/Users/autonate/code/well-nest-marketing-portal/docs/facebook-page-publishing.md`.

### Meta App Setup

Create or use a Meta developer app for the publisher workflow.

Recommended app/use-case path:

```text
Meta Developers
-> My Apps
-> Create App
-> Manage everything on your Page
```

For the AutoNateAI setup, the app was:

```text
AutoNateAI Page Publisher
```

The Page selected during authorization was:

```text
AutoNate AI
```

### Minimum Permissions

The minimum Meta app/user/page token permissions for text/link posting are:

```text
pages_show_list
pages_read_engagement
pages_manage_posts
```

What they do:

| Permission | Why it is needed |
| --- | --- |
| `pages_show_list` | Lets the app discover Pages the signed-in user manages. |
| `pages_read_engagement` | Lets the app read Page content/engagement context required by Meta before Page management actions. |
| `pages_manage_posts` | Lets the app create, edit, and delete Page posts. |

### Optional Testing Permissions

For broader local testing, AutoNateAI also enabled:

```text
pages_manage_engagement
pages_manage_metadata
pages_read_user_content
read_insights
```

What they are for:

| Permission | Future use |
| --- | --- |
| `pages_manage_engagement` | Moderate or respond to comments and other Page engagement. |
| `pages_manage_metadata` | Configure Page metadata/webhook subscriptions. |
| `pages_read_user_content` | Read user-created content on the Page, such as comments or visitor posts. |
| `read_insights` | Read Page/app/domain analytics where permitted. |

Keep production permissions scoped to the actual features being used.

### Add Permissions In Meta

In the app dashboard:

```text
Use cases
-> Manage Pages
-> Permissions and features
```

Click `+ Add` beside the permissions needed for the workflow. The permissions should show as:

```text
Ready for testing
```

### Regenerate Page Token

Use Meta's Graph API Explorer:

```text
Tools
-> Graph API Explorer
```

Set:

```text
Meta App: AutoNateAI Page Publisher
User or Page: User Token
```

Add/select the target permissions, then click:

```text
Generate Access Token
```

Approve the popup as the Page admin and select the `AutoNate AI` Page.

The backend/local script must use the Page access token returned from:

```text
GET /me/accounts?fields=id,name,access_token,tasks
```

Find the object with:

```json
{
  "name": "AutoNate AI"
}
```

Copy that object's `id` and `access_token` into the root `.env`:

```bash
FACEBOOK_PAGE_ID=PASTE_PAGE_ID
FACEBOOK_PAGE_ACCESS_TOKEN=PASTE_PAGE_ACCESS_TOKEN
```

Do not paste or screenshot access tokens. If a token is exposed, regenerate it and replace the `.env` value.

The script publishes text/link posts through:

```text
POST https://graph.facebook.com/v25.0/{PAGE_ID}/feed
```

### Verified Test

Facebook posting was verified from this repo with:

```bash
npm run marketplace:social:post -- \
  --platform facebook \
  --message "Testing the AutoNateAI agricultural research publishing workflow. We are connecting the research site to distribution so future agricultural economic systems briefs can move from investigation to publication to outreach." \
  --link "https://autonateai.com/research-and-case-studies" \
  --confirm
```

Successful Graph API response:

```json
{
  "platform": "facebook",
  "id": "794874887040648_122155020002997798",
  "url": "https://www.facebook.com/794874887040648/posts/122155020002997798"
}
```

If Meta returns:

```text
(#283) Requires pages_read_engagement permission to manage the object
```

add `pages_read_engagement`, regenerate the Page token, update `.env`, and retry.

## LinkedIn Member Profile Requirements

The current AutoNateAI LinkedIn workflow posts from Nathan's personal/member profile, not the company Page. This is intentional: research distribution starts from the trusted human account, with the company Page as a later amplification channel.

LinkedIn member posting uses the official Posts API:

```text
POST https://api.linkedin.com/rest/posts
```

Required headers:

```text
Authorization: Bearer LINKEDIN_ACCESS_TOKEN
Linkedin-Version: 202605
X-Restli-Protocol-Version: 2.0.0
Content-Type: application/json
```

Required member-profile permission:

```text
w_member_social
```

Recommended identity scopes for local automation:

```text
openid
profile
email
```

Those identity scopes let the script call LinkedIn's `userinfo` endpoint and discover the authenticated member's person ID. Without them, the script can have a valid posting token but still not know which author URN to use.

Official references:

- LinkedIn Posts API: `https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api`
- LinkedIn 3-legged OAuth flow: `https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow`

### LinkedIn App Setup

Create or use a LinkedIn Developer app:

```text
LinkedIn Developer Portal
-> My Apps
-> Create app
```

For the AutoNateAI setup, the app was:

```text
AutoNateAI Publisher
```

LinkedIn required a square app logo. A valid `512 x 512` logo was created from the repo asset and placed at:

```text
/Users/autonate/Desktop/autonateai-linkedin-app-logo-512.png
```

Add the products:

```text
Share on LinkedIn
Sign In with LinkedIn using OpenID Connect
```

The Auth tab should show OAuth scopes:

```text
openid
profile
w_member_social
email
```

Add this redirect URL under OAuth 2.0 settings:

```text
https://oauth.pstmn.io/v1/callback
```

### Get A LinkedIn Member Token

Use LinkedIn's token generator:

```text
Docs and tools
-> OAuth Token Tools / Token Generator
```

Select:

```text
App: AutoNateAI Publisher
Scopes: openid profile email w_member_social
```

Generate the token, approve as Nathan, then store it in the root `.env`:

```bash
LINKEDIN_ACCESS_TOKEN=PASTE_ACCESS_TOKEN
LINKEDIN_VERSION=202605
```

Leave these blank unless you need to override author discovery:

```bash
LINKEDIN_PERSON_ID=
LINKEDIN_AUTHOR_URN=
LINKEDIN_ORGANIZATION_ID=
```

The script attempts author discovery in this order:

```text
LINKEDIN_AUTHOR_URN
LINKEDIN_ORGANIZATION_ID
LINKEDIN_PERSON_ID
LinkedIn userinfo `sub` from LINKEDIN_ACCESS_TOKEN
```

Do not commit the token. LinkedIn access tokens expire after roughly two months in the current app settings, so production automation will eventually need a refresh-token or reauthorization workflow.

### Verified LinkedIn Member Test

LinkedIn member posting was verified from this repo with:

```bash
npm run marketplace:social:post -- \
  --platform linkedin \
  --message "Testing the AutoNateAI agricultural research publishing workflow. We are connecting the research site to distribution so future agricultural economic systems briefs can move from investigation to publication to outreach." \
  --link "https://autonateai.com/research-and-case-studies" \
  --confirm
```

Successful LinkedIn response:

```json
{
  "platform": "linkedin",
  "id": "urn:li:share:7505753684769816576",
  "url": "https://www.linkedin.com/feed/update/urn%3Ali%3Ashare%3A7505753684769816576/",
  "response": null
}
```

If author discovery fails with:

```text
LINKEDIN_ACCESS_TOKEN plus LINKEDIN_AUTHOR_URN, LINKEDIN_PERSON_ID, or LINKEDIN_ORGANIZATION_ID are required for LinkedIn publishing.
```

regenerate the LinkedIn token with `openid profile email w_member_social`, or set `LINKEDIN_PERSON_ID` manually.

If LinkedIn profile endpoints return `403`, the token likely lacks identity scopes:

```text
openid
profile
email
```

### Future LinkedIn Company Page Upgrade

Company Page posting is not the current primary workflow. If needed later, request organization social access through LinkedIn products such as Community Management API or Marketing Developer Platform.

Typical organization-page permission:

```text
w_organization_social
```

Optional read/analytics scopes:

```text
r_organization_social
rw_organization_admin
```

LinkedIn requires the authenticated member to hold a valid company page role for organization social actions:

```text
ADMINISTRATOR
DIRECT_SPONSORED_CONTENT_POSTER
CONTENT_ADMIN
```

For company Page posting, set:

```bash
LINKEDIN_ORGANIZATION_ID=YOUR_NUMERIC_ORG_ID
```

or:

```bash
LINKEDIN_AUTHOR_URN=urn:li:organization:YOUR_NUMERIC_ORG_ID
```

### LinkedIn Test Commands

Dry run:

```bash
npm run marketplace:social:post -- \
  --platform linkedin \
  --message "Testing the AutoNateAI agricultural research publishing workflow. Full research library: https://autonateai.com/research-and-case-studies" \
  --link "https://autonateai.com/research-and-case-studies"
```

Live test:

```bash
npm run marketplace:social:post -- \
  --platform linkedin \
  --message "Testing the AutoNateAI agricultural research publishing workflow. Full research library: https://autonateai.com/research-and-case-studies" \
  --link "https://autonateai.com/research-and-case-studies" \
  --confirm
```

If LinkedIn rejects the request, inspect the response for:

| Error shape | Likely issue |
| --- | --- |
| Invalid/unauthorized scope | App does not have `w_member_social`, or token was generated without it. |
| Not enough permissions for `userinfo` | Token lacks `openid`, `profile`, or `email`; regenerate with identity scopes. |
| Expired token | Regenerate or refresh the access token. |
| Invalid author | `LINKEDIN_PERSON_ID`, `LINKEDIN_ORGANIZATION_ID`, or `LINKEDIN_AUTHOR_URN` is wrong. |

## Test Flow

1. Add credentials to `.env`.
2. Run a dry run:

```bash
npm run marketplace:social:post -- \
  --platform facebook \
  --message "Testing the AutoNateAI agricultural research publishing workflow. Full research library: https://autonateai.com/research-and-case-studies" \
  --link "https://autonateai.com/research-and-case-studies"
```

3. Publish one platform at a time:

```bash
npm run marketplace:social:post -- \
  --platform facebook \
  --message "Testing the AutoNateAI agricultural research publishing workflow. Full research library: https://autonateai.com/research-and-case-studies" \
  --link "https://autonateai.com/research-and-case-studies" \
  --confirm
```

4. Confirm the post appears on the Page/account.
5. Repeat for LinkedIn after its member access token is ready.
