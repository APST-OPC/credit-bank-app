import { NotificationItem } from "@/store/home/useNotification";

export const transaction = [
  {
    title: "Amazon",
    category: "Shopping",
    price: "$120.50",
  },
  {
    title: "Netflix",
    category: "Entertainment",
    price: "$15.99",
  },
  {
    title: "Starbucks",
    category: "Food & Drinks",
    price: "$7.50",
  },
  {
    title: "Uber",
    category: "Transport",
    price: "$22.30",
  },
  {
    title: "Walmart",
    category: "Groceries",
    price: "$78.25",
  },
  {
    title: "Spotify",
    category: "Entertainment",
    price: "$9.99",
  },
  {
    title: "Nike Store",
    category: "Shopping",
    price: "$85.00",
  },
  {
    title: "McDonald's",
    category: "Food & Drinks",
    price: "$11.75",
  },
  {
    title: "Shell Gas Station",
    category: "Transportation",
    price: "$50.00",
  },
  {
    title: "Apple Store",
    category: "Electronics",
    price: "$999.00",
  },
  {
    title: "Target",
    category: "Household",
    price: "$45.60",
  },
  {
    title: "Lyft",
    category: "Transport",
    price: "$18.90",
  },
  {
    title: "Costco",
    category: "Groceries",
    price: "$210.30",
  },
  {
    title: "Hulu",
    category: "Entertainment",
    price: "$12.99",
  },
  {
    title: "Best Buy",
    category: "Electronics",
    price: "$249.99",
  },
  {
    title: "Gym Membership",
    category: "Health & Fitness",
    price: "$35.00",
  },
  {
    title: "Domino's Pizza",
    category: "Food & Drinks",
    price: "$18.99",
  },
  {
    title: "Gas Station",
    category: "Transport",
    price: "$40.00",
  },
  {
    title: "CVS Pharmacy",
    category: "Healthcare",
    price: "$12.45",
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    title: "Transaction Successful",
    description:
      "You spent $49.99 at Amazon. Your updated balance is $1,250.75.",
    timespan: "5 minutes ago",
    read: false,
  },
  {
    title: "Payment Due Reminder",
    description:
      "Your credit card payment of $150 is due in 3 days. Avoid late fees!",
    timespan: "1 hour ago",
    read: false,
  },
  {
    title: "Unusual Spending Alert",
    description:
      "We noticed an unusual transaction of $900 at Electronics Hub. Was this you?",
    timespan: "3 hours ago",
    read: false,
  },
  {
    title: "Cashback Earned",
    description:
      "You earned $5.25 cashback on your latest purchase at Walmart!",
    timespan: "6 hours ago",
    read: true,
  },
  {
    title: "Credit Limit Increase",
    description:
      "Congratulations! Your credit limit has been increased to $5,000.",
    timespan: "1 day ago",
    read: true,
  },
  {
    title: "Card Declined",
    description:
      "Your card was declined for a $200 purchase at Gas Station. Check your balance.",
    timespan: "2 days ago",
    read: true,
  },
  {
    title: "New Statement Available",
    description:
      "Your monthly credit card statement for January is ready to view.",
    timespan: "3 days ago",
    read: true,
  },
  {
    title: "Fraud Alert",
    description:
      "A suspicious $500 charge was detected in a different city. Review your transactions.",
    timespan: "4 days ago",
    read: false,
  },
  {
    title: "Annual Fee Charged",
    description:
      "Your annual membership fee of $99 has been charged to your credit card.",
    timespan: "6 days ago",
    read: true,
  },
  {
    title: "Reward Points Expiring",
    description:
      "You have 2,500 reward points expiring soon. Redeem them before they expire!",
    timespan: "1 week ago",
    read: false,
  },
  {
    title: "Transaction Successful",
    description:
      "You spent $49.99 at Amazon. Your updated balance is $1,250.75.",
    timespan: "5 minutes ago",
    read: false,
  },
  {
    title: "Payment Due Reminder",
    description:
      "Your credit card payment of $150 is due in 3 days. Avoid late fees!",
    timespan: "1 hour ago",
    read: false,
  },
  {
    title: "Unusual Spending Alert",
    description:
      "We noticed an unusual transaction of $900 at Electronics Hub. Was this you?",
    timespan: "3 hours ago",
    read: false,
  },
  {
    title: "Cashback Earned",
    description:
      "You earned $5.25 cashback on your latest purchase at Walmart!",
    timespan: "6 hours ago",
    read: true,
  },
  {
    title: "Credit Limit Increase",
    description:
      "Congratulations! Your credit limit has been increased to $5,000.",
    timespan: "1 day ago",
    read: true,
  },
  {
    title: "Card Declined",
    description:
      "Your card was declined for a $200 purchase at Gas Station. Check your balance.",
    timespan: "2 days ago",
    read: true,
  },
  {
    title: "New Statement Available",
    description:
      "Your monthly credit card statement for January is ready to view.",
    timespan: "3 days ago",
    read: true,
  },
  {
    title: "Fraud Alert",
    description:
      "A suspicious $500 charge was detected in a different city. Review your transactions.",
    timespan: "4 days ago",
    read: false,
  },
  {
    title: "Annual Fee Charged",
    description:
      "Your annual membership fee of $99 has been charged to your credit card.",
    timespan: "6 days ago",
    read: true,
  },
  {
    title: "Reward Points Expiring",
    description:
      "You have 2,500 reward points expiring soon. Redeem them before they expire!",
    timespan: "1 week ago",
    read: false,
  },
];

export const promos = [
  {
    promoId: 1,
    promoImage: require("@/assets/images/promo-pic.jpg"),
    promoHeader: "A Love-Filled Season for Savings",
    promoContent: {
      promoImageFull: require("@/assets/images/promo-fullpic.png"),
      promoTitle: "Happy Valentine's Day!\nHere's a Special Offer for YOU💌💐",
      promoDesc:
        "This Valentine's season, BankApp is making it sweeter for payroll employees and cooperative clients! Join A Love-Filled Season for Savings and earn exciting rewards for taking steps to build your financial future.",
      promoDetail: "Here's how you can earn rewards:",
      promoDetailImage: require("@/assets/images/promo-info.png"),
    },
  },
  {
    promoId: 2,
    promoImage: require("@/assets/images/promo-pic.jpg"),
    promoHeader: "A Love-Filled Season for Savings",
    promoContent: {
      promoImageFull: require("@/assets/images/promo-fullpic.png"),
      promoTitle: "Happy Valentine's Day!\nHere's a Special Offer for YOU💌💐",
      promoDesc:
        "This Valentine's season, BankApp is making it sweeter for payroll employees and cooperative clients! Join A Love-Filled Season for Savings and earn exciting rewards for taking steps to build your financial future.",
      promoDetail: "Here's how you can earn rewards:",
      promoDetailImage: require("@/assets/images/promo-info.png"),
    },
  },
  {
    promoId: 3,
    promoImage: require("@/assets/images/promo-pic.jpg"),
    promoHeader: "A Love-Filled Season for Savings",
    promoContent: {
      promoImageFull: require("@/assets/images/promo-fullpic.png"),
      promoTitle: "Happy Valentine's Day!\nHere's a Special Offer for YOU💌💐",
      promoDesc:
        "This Valentine's season, BankApp is making it sweeter for payroll employees and cooperative clients! Join A Love-Filled Season for Savings and earn exciting rewards for taking steps to build your financial future.",
      promoDetail: "Here's how you can earn rewards:",
      promoDetailImage: require("@/assets/images/promo-info.png"),
    },
  },
  {
    promoId: 4,
    promoImage: require("@/assets/images/promo-pic.jpg"),
    promoHeader: "A Love-Filled Season for Savings",
    promoContent: {
      promoImageFull: require("@/assets/images/promo-fullpic.png"),
      promoTitle: "Happy Valentine's Day!\nHere's a Special Offer for YOU💌💐",
      promoDesc:
        "This Valentine's season, BankApp is making it sweeter for payroll employees and cooperative clients! Join A Love-Filled Season for Savings and earn exciting rewards for taking steps to build your financial future.",
      promoDetail: "Here's how you can earn rewards:",
      promoDetailImage: require("@/assets/images/promo-info.png"),
    },
  },
];
