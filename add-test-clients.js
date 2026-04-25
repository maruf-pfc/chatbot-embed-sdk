const fs = require("fs");
const path = require("path");

const newData = {
  clients: {
    "demo-coffee-shop": {
      id: "demo-coffee-shop",
      business_name: "Bean & Brew Coffeehouse",
      business_info:
        "Hours: Open 7am to 7pm daily (7 days a week, including holidays).\n\nCoffee Menu:\n- Espresso: $3 (single), $5 (double)\n- Latte: $4.50 (hot or iced), add flavored syrup +$0.75\n- Cappuccino: $4.50\n- Cold Brew: $4 (nitro cold brew +$1)\n- Drip Coffee: $2.50 (free refills)\n- Mocha: $5\n- Chai Latte: $4.50\n- Hot Chocolate: $3.50\n- Matcha Latte: $5\n\nPastries & Food:\n- Butter Croissant: $3\n- Chocolate Croissant: $3.50\n- Blueberry Muffin: $2.50\n- Chocolate Chip Muffin: $2.50\n- Banana Bread: $3.50\n- Avocado Toast: $7\n- Breakfast Sandwich: $6.50\n\nAmenities:\n- Free WiFi (password on receipt)\n- Outdoor seating (20 seats)\n- Indoor seating (35 seats)\n- Pet-friendly patio\n- Catering available for 10+ people (24hr notice required)\n- Loyalty program: Buy 10 drinks, get 1 free\n- Returns accepted within 14 days with receipt\n- Gift cards available ($10-$100)\n\nLocation: 123 Coffee Street, Downtown\nPhone: (555) 727-2834\nEmail: hello@beanbrew.com\n\nSpecial Notes:\n- We use organic, fair-trade beans\n- Oat milk and almond milk available (+$0.75)\n- Gluten-free pastries available (ask staff)\n- Live music every Friday 6pm-8pm\n- Open mic night every last Thursday of the month",
      fallback_message:
        "I don't have that info — please call us at (555) 727-2834, email hello@beanbrew.com, or ask a barista in-store. We're here to help! ☕",
      bubble_color: "#6F4E37",
      created_at: new Date().toISOString(),
    },
    "page-turner-books": {
      id: "page-turner-books",
      business_name: "Page Turner Books",
      business_info:
        "Hours:\n- Monday-Saturday: 10am to 8pm\n- Sunday: 12pm to 6pm\n- Closed on Christmas Day and Thanksgiving\n\nLocation: 123 Main Street, downtown (next to Central Park)\nPhone: (555) 789-0123\nEmail: hello@pageturnerbooks.com\n\nBook Categories:\n- Fiction & Literature\n- Mystery & Thriller\n- Science Fiction & Fantasy\n- Romance\n- Children's Books (ages 0-12)\n- Young Adult\n- Biography & Memoir\n- History & Politics\n- Cookbooks\n- Art & Photography\n\nPricing:\n- New Paperbacks: $12-18\n- New Hardcover: $22-28\n- Used Books: 50% off cover price\n- Rare/Collectible: Varies (ask staff)\n- Children's books: $8-15\n\nServices:\n- Special orders: 5-7 business days, no extra fee\n- Gift wrapping: $2 per book\n- Book donations accepted (tax receipt provided)\n- Author events monthly (check calendar)\n- Reading lounge with free WiFi\n- Coffee shop inside (espresso drinks $3-5)\n\nBook Club:\n- Meets every Wednesday at 7pm\n- Monthly theme announced first of each month\n- 15% discount on book club picks\n\nReturns:\n- 30 days with receipt\n- Store credit for returns after 30 days\n- No returns on used books\n\nMembership:\n- Free to join\n- Earn points: 1 point per $10 spent\n- 100 points = $5 off\n- Birthday discount: 20% off\n\nParking: Free parking in lot behind store (entrance on Maple St)",
      fallback_message:
        "I don't have that info — please visit our store, call (555) 789-0123, or email hello@pageturnerbooks.com. We'd love to help you find your next great read! 📚",
      bubble_color: "#8B4513",
      created_at: new Date().toISOString(),
    },
    "quick-fix-handyman": {
      id: "quick-fix-handyman",
      business_name: "Quick Fix Handyman",
      business_info:
        "Service Area: Downtown and surrounding suburbs within 15 miles (zip codes: 90210, 90211, 90212, 90213)\n\nHours:\n- Monday-Friday: 8am-6pm\n- Saturday: 9am-3pm\n- Sunday: Closed\n- Emergency service: 24/7 (adds $50 surcharge)\n\nPhone: (555) 456-7890\nEmail: support@quickfix.com\nWebsite: www.quickfixhandyman.com\n\nServices & Pricing:\n- Plumbing: $85-150\n- Electrical: $95-200\n- Painting: $200-500 per room\n- Furniture Assembly: $75-150\n- Drywall Repair: $150-300\n- Ceiling Fan Installation: $100-175\n- TV Mounting: $75-125\n- Door/Window Repair: $80-200\n- Deck/Patio Repair: $200-500\n- Pressure Washing: $150-300\n- Gutter Cleaning: $100-200\n\nEmergency Services (24/7):\n- Burst pipes\n- Electrical hazards\n- Lockouts\n- Storm damage\n\nDiscounts:\n- Senior discount (65+): 10% off\n- Military/Veteran: 15% off\n- First-time customer: 20% off\n\nPayment Methods:\n- Cash (5% discount)\n- Credit Card (Visa, MC, Amex, Discover)\n- Venmo (@QuickFix)\n- PayPal\n- Check\n\nPolicies:\n- Free estimates\n- Same-day service if booked before 10am\n- 48-hour cancellation: $50 fee\n- 30-day warranty on all work\n- Licensed and insured (#HF12345)",
      fallback_message:
        "I don't have that info — please call (555) 456-7890 for immediate assistance, or email support@quickfix.com. 🔧",
      bubble_color: "#DC2626",
      created_at: new Date().toISOString(),
    },
    "iron-fit-gym": {
      id: "iron-fit-gym",
      business_name: "Iron Fit Gym",
      business_info:
        "Hours: Open 24/7, 365 days a year\n\nLocation: 789 Fitness Blvd, 2nd floor\nPhone: (555) 234-5678\nEmail: info@ironfit.com\n\nMembership Plans:\n- Basic ($49/month): 24/7 access, free weights, machines, cardio\n- Premium ($79/month): Basic + classes + 2 guest passes/month\n- Annual ($499/year): Premium benefits, 2 months free\n- Day Pass: $15\n- Student Discount: 20% off (with .edu email)\n\nFees:\n- Annual fee: $49 (March)\n- Late payment: $25\n- Cancellation fee: $50 (if within first 3 months)\n\nAmenities:\n- Free weights (5-100 lbs)\n- Weight machines (20+ stations)\n- Cardio area (treadmills, ellipticals, bikes, rowers)\n- Sauna (men's and women's)\n- Steam room\n- Showers (towel service included)\n- Locker rooms\n- Smoothie bar (10% member discount)\n- Free parking (attached garage)\n- WiFi throughout\n\nGroup Classes (Premium):\n- Yoga: Mon/Wed 6pm\n- Spin: Tue/Thu 7am\n- HIIT: Fri 5pm\n- Zumba: Sat 10am\n- Pilates: Mon/Wed 8am\n\nPersonal Training:\n- Single session: $60\n- 5 sessions: $275 ($55/session)\n- 10 sessions: $500 ($50/session)\n- Small group (2-4): $35/person\n\nPolicies:\n- Cancellation: 30-day written notice\n- Freeze membership: $10/month (up to 3 months)\n- Guest passes: Premium gets 2 free/month, additional $10\n- Minimum age: 16 (under 18 needs parent signature)",
      fallback_message:
        "I don't have that info — please email info@ironfit.com, call (555) 234-5678, or visit the front desk. We're here 24/7! 💪",
      bubble_color: "#0891B2",
      created_at: new Date().toISOString(),
    },
  },
};

// Write to file
const dbPath = path.join(__dirname, "database", "clients.json");
fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));

console.log("✅ Database updated successfully!");
console.log("📊 Clients updated:");
Object.keys(newData.clients).forEach((key) => {
  console.log(`   - ${newData.clients[key].business_name}`);
});
