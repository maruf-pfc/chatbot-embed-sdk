Perfect! Let me create **complete documentation** and **Docker setup** for Coolify deployment.

## 📚 Complete Documentation

### 1. Client Documentation

**`CLIENT-GUIDE.md`**

````markdown
# BrightPeak Chat Widget - Client Guide

## What is this?

A smart AI chat widget that answers customer questions automatically based on YOUR business information. No coding required!

## Quick Start (3 minutes)

### Step 1: Get Your Widget Code

1. Your admin will provide you with:
   - A unique Client ID (e.g., `my-business-123`)
   - Your brand color (e.g., `#6F4E37`)

### Step 2: Add to Your Website

Copy this ONE line of code and paste it just before the `</body>` tag on your website:

```html
<script
  src="https://your-widget-domain.com/widget.js"
  data-bot-id="YOUR_CLIENT_ID"
  data-color="YOUR_BRAND_COLOR"
></script>
```
````

### Step 3: That's It!

The chat bubble will automatically appear on your website. Your customers can now ask questions and get instant answers based on YOUR business information.

## How It Works

1. **Customer clicks chat bubble** → Asks a question
2. **AI reads YOUR business info** → Finds the answer
3. **Sends natural response** → Customer gets help instantly

## What Your Customers Can Ask

- ✅ "What are your hours?"
- ✅ "How much does X cost?"
- ✅ "Do you offer Y service?"
- ✅ "Where are you located?"
- ✅ "What's your return policy?"

## Platform-Specific Instructions

### Webflow

1. Go to Site Settings → Custom Code
2. Paste script in **Footer Code** section
3. Publish your site

### WordPress

1. Install "Insert Headers and Footers" plugin
2. Go to Settings → Insert Headers and Footers
3. Paste script in **Footer** section
4. Save changes

### Shopify

1. Go to Online Store → Themes → Edit code
2. Find `theme.liquid`
3. Paste script before `</body>` tag
4. Save

### Wix (Business plan required)

1. Go to Settings → Custom Code
2. Click + Add Custom Code
3. Paste script, choose "Body - end" placement
4. Apply to all pages

### Squarespace

1. Go to Settings → Advanced → Code Injection
2. Paste in **Footer** section
3. Save

### Any HTML Website

1. Open your HTML file
2. Find `</body>` tag
3. Paste script right before it
4. Upload to your server

## Customization

### Change Bubble Color

Update the `data-color` attribute in the script:

```html
<script src="..." data-bot-id="..." data-color="#FF0000"></script>
```

### Change Position (Advanced)

Add this CSS to your website:

```css
#chat-widget-button {
  bottom: 30px !important;
  right: 30px !important;
}
```

## Testing Your Widget

1. Add the script to your website
2. Visit your website
3. Click the chat bubble
4. Ask questions about your business

## FAQs

**Q: Does it work on mobile?**  
A: Yes! Fully responsive on all devices.

**Q: Can I customize the welcome message?**  
A: Yes, contact your admin to update the business information.

**Q: What if the AI doesn't know something?**  
A: It will show your custom fallback message (e.g., "Please call us at...").

**Q: Is there a monthly fee?**  
A: Contact your admin for pricing details.

## Need Help?

Contact your admin at: [admin email]

**Pro Tip:** The widget works on ALL websites - no technical skills needed!
