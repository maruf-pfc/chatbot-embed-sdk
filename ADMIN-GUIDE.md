# 2. Admin Documentation

**`ADMIN-GUIDE.md`**

```markdown
# BrightPeak Chat Widget - Admin Guide

## Dashboard Overview

Access your admin panel at: `https://your-domain.com/admin`

### Features

- 📊 **Dashboard** - Overview of all clients
- 👥 **Clients** - Manage client information
- ⚙️ **Settings** - Configure widget defaults
- 📈 **Analytics** - Track usage (coming soon)

## Adding a New Client

### Step 1: Go to Admin Panel

Navigate to `https://your-domain.com/admin`

### Step 2: Fill Client Information

| Field            | Description                                    | Example                   |
| ---------------- | ---------------------------------------------- | ------------------------- |
| Client ID        | Unique identifier (no spaces)                  | `coffee-shop-downtown`    |
| Business Name    | Display name                                   | "Bean & Brew Coffeehouse" |
| Business Info    | ALL business details (hours, prices, services) | See template below        |
| Fallback Message | Message when AI doesn't know                   | "Please call us at..."    |
| Bubble Color     | Hex color code                                 | `#6F4E37`                 |

### Step 3: Business Info Template

Copy this template and fill with client's actual info:
```

Hours: [days and times open]

Products/Services:

- [Item 1]: $[price]
- [Item 2]: $[price]

Amenities:

- [Amenity 1]
- [Amenity 2]

Location: [address]
Phone: [number]
Email: [email]

Policies:

- [Policy 1]
- [Policy 2]

Special Notes:

- [Note 1]
- [Note 2]

````

### Step 4: Save and Get Embed Code

1. Click "Save Client"
2. Copy the generated embed code
3. Send to your client

## Managing Clients

### View All Clients
- Clients appear in the dashboard and clients page
- Search by name or ID
- Click to view details

### Edit Client
1. Go to Clients page
2. Find the client
3. Click edit (or re-save with same ID)
4. Update information

### Delete Client
1. Click delete button
2. Confirm deletion
3. Widget will stop working immediately

## Embed Code Formats

### Standard Embed
```html
<script src="https://your-domain.com/widget.js" data-bot-id="CLIENT_ID" data-color="COLOR"></script>
````

### Multiple Widgets (Different Pages)

```html
<!-- Home page widget -->
<script
  src="https://your-domain.com/widget.js"
  data-bot-id="home-page"
  data-color="#FF0000"
></script>

<!-- Contact page widget -->
<script
  src="https://your-domain.com/widget.js"
  data-bot-id="contact-page"
  data-color="#00FF00"
></script>
```

## Best Practices

### Business Info Tips

✅ **DO:**

- Include ALL important information
- Use clear, simple language
- List prices explicitly
- Include contact info in fallback message

❌ **DON'T:**

- Use vague descriptions
- Leave out pricing
- Forget to update when things change

### Example Business Info (Gym)

```
Hours: Open 24/7, 365 days a year

Membership Plans:
- Basic ($49/month): 24/7 access, weights, cardio
- Premium ($79/month): Basic + classes + 2 guest passes

Classes:
- Yoga: Mon/Wed 6pm
- Spin: Tue/Thu 7am
- HIIT: Fri 5pm

Amenities:
- Free WiFi
- Sauna and steam room
- Towel service (premium only)

Location: 789 Fitness Blvd, 2nd floor
Phone: (555) 234-5678

Policies:
- 30-day cancellation notice
- Guest passes: Premium gets 2 free/month
```

## Troubleshooting

### Widget Not Appearing?

1. Check browser console (F12) for errors
2. Verify the script tag is correct
3. Ensure client ID exists in database
4. Check if domain is correct

### AI Giving Wrong Answers?

1. Review business info in admin panel
2. Make sure info is clear and specific
3. Add more details to business info

### Bot Always Shows Fallback?

1. Check if question is covered in business info
2. Update business info with missing details
3. Test with exact wording from business info

## API Endpoints (for developers)

```bash
# Get all clients
GET /api/admin/clients

# Create/update client
POST /api/admin/clients
Content-Type: application/json
{
  "id": "client-id",
  "business_name": "Business Name",
  "business_info": "All business details...",
  "fallback_message": "Fallback message",
  "bubble_color": "#HEXCODE"
}

# Delete client
DELETE /api/admin/clients/:id
```

## Security

- 🔒 Client IDs are unique identifiers
- 🔒 Database stored locally (no external services)
- 🔒 API keys stored in environment variables
- 🔒 CORS configured for security

## Support

For technical issues, contact: [mmsmaruf.official@gmail.com](mmsmaruf.official@gmail.com)
