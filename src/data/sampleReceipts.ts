export const SAMPLE_RECEIPTS = [
  {
    name: 'Coffee Shop Receipt',
    text: `STARBUCKS COFFEE
123 Main Street
Seattle, WA 98101

Grande Latte           $4.95
Chocolate Croissant    $3.50
Subtotal:              $8.45
Tax:                   $0.85
Total:                 $9.30

Visa ****1234
Date: 09/28/2024 10:30 AM
Thank you for your visit!`
  },
  {
    name: 'Ride Share Receipt',
    text: `UBER TECHNOLOGIES
Trip Receipt

From: 123 Oak Street
To: Downtown Office Building
Distance: 5.2 miles

Trip Fare:             $23.45
Service Fee:           $2.50
Total:                 $25.95

Charged to Visa ending in 5678
Trip Date: 09/27/2024 2:15 PM`
  },
  {
    name: 'Office Supplies',
    text: `OFFICE DEPOT
Store #1234
456 Business Pkwy

Printer Paper (3 Reams)  $29.97
Pens (Box of 12)         $8.99
Notebooks (5 Pack)       $12.50
Subtotal:                $51.46
Tax:                     $4.63
Total:                   $56.09

Mastercard ****9012
Date: 09/26/2024`
  },
  {
    name: 'Hotel Stay',
    text: `HILTON GARDEN INN
Receipt #HTL789123

Guest: Business Traveler
Check-in: 09/25/2024
Check-out: 09/27/2024
Room Type: King Deluxe

Room Charges (2 nights)  $289.00
Resort Fee               $30.00
Tax:                     $31.90
Total:                   $350.90

Payment: Amex ****3456`
  },
  {
    name: 'Restaurant',
    text: `THE ITALIAN RESTAURANT
Fine Dining Experience

Appetizers               $24.00
Main Courses (2)         $68.00
Desserts                 $16.00
Beverages                $18.00
Subtotal:                $126.00
Tax:                     $11.34
Gratuity (20%):          $25.20
Total:                   $162.54

Visa ****7890
Date: 09/24/2024 7:30 PM`
  },
  {
    name: 'Gas Station',
    text: `SHELL GAS STATION
Station #5678

Unleaded 87
Gallons: 12.5
Price/Gallon: $3.45
Total:                   $43.13

Debit Card ****2345
Date: 09/23/2024 8:15 AM
Thank you!`
  }
];

export const getRandomReceipt = (): string => {
  const random = SAMPLE_RECEIPTS[Math.floor(Math.random() * SAMPLE_RECEIPTS.length)];
  return random.text;
};