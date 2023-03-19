const fs = require("fs");
// const PDFDocument = require("pdfkit");
const PDFDocument = require("pdfkit-table");
var temp =0;
var temp1 = 0;
var temp2 = 0;

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  fieldTab(doc);
  createTable(doc);
  exchangeRateBox(doc);
  addressBox(doc);
  generateFooter(doc);
  itemQuantity(doc);
  doc.addPage();
  generateHeader(doc);
  page1Content(doc);
  doc.end();
  doc.pipe(fs.createWriteStream(path));
  
}

function generateHeader(doc) {
  doc
    .image("xhp_logo.png", 50, 45, { width: 150 })
    .image("xhp_profile.png", 430, 42, { width: 27})
     generateHr(doc, 80);
  doc
    .lineWidth(2)
    .moveTo(470, 45)
    .lineTo(470, 65)
    .stroke()
    .fillColor("#ff5120");

  doc.fontSize(13).font('Helvetica')
    .text("Produze",480,50)
    .fillColor("#ff5120");
}

function fieldTab(doc){
  doc.roundedRect(50, 90, 120, 22, 5).fillAndStroke('#d9d9f0');
  
  doc.fill('#292929').stroke();
  doc.image("xhp_bkm.png", 55, 95, { width: 10});
  doc.fontSize(8);
  doc.text(" Quote ID : XQ02231513", 70, 97, {lineBreak: false} );
  // doc.image("logo.png", 50, 45, { width: 150 });

  doc.roundedRect(180, 90, 65, 22, 5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.image("xhp_commo.png", 185, 95, { width: 10});
  doc.fontSize(8);
  doc.text("Type : LCL", 200, 97, {lineBreak: false} );

  doc.roundedRect(255, 90, 125, 22, 5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.image("xhp_cal.png", 265, 95, { width: 10});
  doc.fontSize(8);
  doc.text("Sailing Date : 27-03-2023", 280, 97, {lineBreak: false} );

  doc.roundedRect(390, 90, 105, 22, 5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.image("xhp_dist.png", 395, 95, { width: 10});
  doc.fontSize(8);
  doc.text("Transit Time : 26 days", 410, 97, {lineBreak: false} );
}

function createTable(doc){
   temp = 130;
   doc.text(" ",50, temp)
   doc.rect(50,temp,505,28,5)
   .lineWidth(.5)
   .fillAndStroke('#e6e6fa','black');
   
   doc
    .lineWidth(.5)
    .moveTo(150, temp)
    .lineTo(150, 144.99599999999998+22)
    .stroke(); 
  doc
    .lineWidth(.5)
    .moveTo(320, temp)
    .lineTo(320, 144.99599999999998+22)
    .stroke(); 
  doc
    .lineWidth(.5)
    .moveTo(455, temp)
    .lineTo(455, 144.99599999999998+22)
    .stroke();  
   const table01 = {
    "headers" : ["Charge Type", "Charge Name", "Unit of Measurement", "Price"],
     "rows": [
         [ "Origin", "All-Inclusive port-to-door rate", "Per CPM", " 27,699.22 INR " ],
         [ " ", " ", "Total : ", "27,699.22 INR "],
         
     ],
     
   };
   
   doc.table(table01, {
     columnSpacing: 10,
     padding: 5,
     columnsSize: [100, 170, 135, 100],
     align: "right",
     prepareHeader: () => doc.fontSize(8).fillColor('#292929'),
     prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
 
       const {x, y, width, height} = rectCell;
       if(indexColumn === 0){
         doc
         .lineWidth(.5)
         .moveTo(x, y)
         .lineTo(x, y + height)
         .stroke();  
       }
 
       doc
       .lineWidth(.5)
       .moveTo(x + width, y)
       .lineTo(x + width, y + height)
       .stroke();
 
       doc.fontSize(8).fillColor('#292929');
       temp1 = x;
       temp2 = y + height;
       
     }, // {Function}

    
   });
 
}

function exchangeRateBox(doc){
if(temp2 > 426){
    doc.addPage();
    generateHeader(doc);
    temp2 = 90;

   }
  let height =5;
  console.log(temp2); 
  doc.roundedRect(50, temp2+15, 505, 40, 5).fillAndStroke('#d9d9f0',"#292929");
  doc.fill('#292929').stroke();
  doc.fontSize(6);
  temp2 = temp2+15
  doc.text(" ",55,temp2+height)
  doc.text("All prices mentioned here are excluding duties, local taxes and any incidental charges (if applicable)",{align: "right"})
  doc.text("Exchange Rate ( INR/USD ) : 82.29 INR", {align: "left"});
  doc.text("Final Exchange Rate to be determined on biling date",{align: "right"});
  temp2 = temp2+40;
}

function addressBox(doc){
  boxWidth = 160;
  doc.roundedRect(50, temp2+15, 505, boxWidth,5).fillAndStroke('white',"#292929");

  doc.roundedRect(55, temp2+145, 115, 22,5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.fontSize(8);
  doc.text("Origin Custom Clearance", 60, temp2+152, {lineBreak: false} );

  doc.roundedRect(175, temp2+145, 135, 22,5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.fontSize(8);
  doc.text("Destination Custom Clearance", 185, temp2+152, {lineBreak: false} );

  let col1LeftPos = 65;
  let height = 30;
  let imageWidth = 15
  let colTop = temp2+height;
  let colWidth = 150;
  let col2LeftPos = colWidth + col1LeftPos + 40;

  doc.fontSize(8)
    .image("xhp_dist.png", col1LeftPos, colTop-2, { width: 10})
    .text('Origin * Door, IND', col1LeftPos+imageWidth, colTop, {width: colWidth})
    .text('B11/7 & B11/8 IDA Uppal, 500039', col2LeftPos, colTop, {width: colWidth+100})
  colTop = colTop + height;
  doc.fontSize(8)
    .image("xhp_dist.png", col1LeftPos, colTop-2, { width: 10})
    .text('Destination * Amazon FC, USA', col1LeftPos+imageWidth, colTop, {width: colWidth})
    .text('AVP1 - 550 Oak Ridge Road, Hazleton, PA 18202', col2LeftPos, colTop, {width: colWidth+100})
  colTop = colTop + height;
  doc.fontSize(8)
    .image("xhp_ship.png", col1LeftPos, colTop-2, { width: 10})
    .text('Shipment Incoterms', col1LeftPos+imageWidth, colTop, {width: colWidth})
    .text('DDP', col2LeftPos, colTop, {width: colWidth+100})
  colTop = colTop + height
  doc.fontSize(8)
    .image("xhp_commo.png", col1LeftPos, colTop-2, { width: 10})
    .text('Commodity Description', col1LeftPos+imageWidth, colTop, {width: colWidth})
    .text('Kids toys and board games, puzzles', col2LeftPos, colTop, {width: colWidth+100})

  doc.roundedRect(320, temp2+145, 50, 22,5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.fontSize(8);
  doc.text("Stackable", 325, temp2+152, {lineBreak: false} );

  doc.roundedRect(380, temp2+145, 60, 22,5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.fontSize(8);
  doc.text("Palletization", 385, temp2+152, {lineBreak: false} );

  doc.roundedRect(450, temp2+145, 85, 22,5).fillAndStroke('#d9d9f0');
  doc.fill('#292929').stroke();
  doc.fontSize(8);
  doc.text("hazardous Goods", 455, temp2+152, {lineBreak: false} );

  temp2 = temp2+boxWidth;

}

function itemQuantity(doc){
  let height = 30;
  doc.roundedRect(50, temp2+height, 505, 100,5).fillAndStroke('white',"#292929");
  temp2 = temp2+height;
  doc.roundedRect(55, temp2+10, 495, 22,5).fillAndStroke('#d9d9f0');
  temp2 = temp2 + 10;

  let col1LeftPos = 65;
  let colTop = temp2 + 8;
  let colWidth = 80;
  let col2LeftPos = colWidth + col1LeftPos + 40;
  let col3LeftPos = colWidth + col2LeftPos + 40;
  let col4LeftPos = colWidth + col3LeftPos + 40;

  doc
    .fontSize(8)
    .fill('#292929')
    .text('Items', col1LeftPos, colTop, {width: colWidth})
    .text('Dimensions', col2LeftPos, colTop, {width: colWidth+100})
    .text('Volume/ Item', col3LeftPos, colTop, {width: colWidth})
    .text('Total Volume', col4LeftPos, colTop, {width: colWidth+100})
  colTop = colTop + height;
  doc
    .fontSize(8)
    .fill('#292929')
    .text('70 Boxes', col1LeftPos, colTop, {width: colWidth})
    .text('38 * 36 * 37 cm', col2LeftPos, colTop, {width: colWidth+100})
    .text('0.0506 CBM', col3LeftPos, colTop, {width: colWidth})
    .text('3.5431', col4LeftPos, colTop, {width: colWidth+100})
    
  colTop = colTop + height;
  doc
    .fontSize(8)
    .fill('#292929')
    .text('Total Cargo Volume : 3.5431 CBM', col1LeftPos, colTop, {width: colWidth+100})
    .text('Total Gross Weight : 433 kg', col2LeftPos+50, colTop, {width: colWidth+100})
  
  temp2 = temp2+100;

}

function page1Content(doc){
   let content = ""
    temp1 = 100
   doc.fontSize(10).font('Helvetica-Bold').fillColor('#292929')
   .text("Quotation Terms and Conditions",50,temp1+30).fillColor('#292929'),
   doc.fontSize(8).font('Helvetica')
   .text("Overview: ",50,temp1+60).fillColor('#292929'),

   doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
   doc.list([
    "Holaport Logistics Private Limited, hereby referred to as “Holaport”, operating under the brand name “Xhipment”, amongst other things through its digital platform,provides the Customer shipment, Sogistic services, freight forwarding services through its vendors " ,
    "Our offer(s) do not include the insurance. Please contact us for more details",
    "Please note that the transit time indicated next to Port-Port Information corresponds to the transit time between the two ports and will be revised as updated from time to time. All transit times provided are based on information available to Holaport at the time of providing the quote and are subject to change",
    "In addition to these terms and conditions, Holaport’s digital platform terms and conditions and any other specific Customer terms (which shaSS be shared with the Customer) shall be applicable. and it shall be further construed that on acceptance of the Quotation, these terms will be deemed to have been read over and duly accepted by the you, the Customer.",
    "Unless guaranteed service is expressly stated by Holaport, all services are provided with reasonable dispatch, and Holaport do not guarantee that services wiSS be delivered without delay nor shall Holaport assume liability for penalties, fines, chargebacks, or any other costs associated with delayed services."
  ], 50, temp1 + 75, {
    // this is how automatic line wrapping will work if the width is specified
    lineGap: 2,
    width: 505,
    paragraphGap: 4,
    align: 'left',
    listType: 'bullet',
    textIndent: 5,
    bulletRadius: 1, // use this value to almost hide the dots/bullets
  });

  doc.fontSize(8).font('Helvetica')
   .text("Definitions: ",50,temp1+185).fillColor('#292929'),

   doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
   doc.list([
    " \"Customer\” shall mean any person who avails the Services " ,
    " \"Sevices\" shall mean the services as more specifically listed on the Quotation, including without \
    limitation shipping and logistic services, associated services including freight insurance or customs \
    brokerage services, trade finance and invoice discounting as may be agreed to in the Quotation",
    " \"Quotation \" means the quotation shared with you by Holaport on the digital platform.",

  ], 50, temp1 + 200, {
    // this is how automatic line wrapping will work if the width is specified
    lineGap: 2,
    width: 505,
    paragraphGap: 4,
    align: 'left',
    listType: 'bullet',
    textIndent: 5,
    bulletRadius: 1, // use this value to almost hide the dots/bullets
  });

  doc.fontSize(8).font('Helvetica').fillColor('#292929')
   .text("Terms and Conditions: ",50,temp1+255)

   doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
   doc.list([
    " Confidentiality : This offer, and quotation shall be the exclusive property of Holaport, and may not be reproduced or distributed in any way or used by the Customer except with the express prior written consent of Holaport. The Customer undertakes to keep this offer and quotation and any information provided by HoSaport strictly confidential and shall not disclose the same to any third party" ,
    " Insurance : Unless requested to do so in writing, and confirmed to Customer in writing, Holaport is under no obligation to procure insurance on Customer's behalf. In all cases, Customers shall pay all premiums and costs in connection with procuring necessary insurance.",
    " Payments : ",
  ], 50, temp1 + 270, {
    // this is how automatic line wrapping will work if the width is specified
    lineGap: 2,
    width: 505,
    paragraphGap: 4,
    align: 'left',
    listType: 'bullet',
    textIndent: 5,
    bulletRadius: 1, // use this value to almost hide the dots/bullets
  });

  doc.list([
    "All payments are due and payable without offset within fifteen (15) days from the invoice date, including Saturdays, Sundays, and legal holidays. The day after the invoice date begins the credit term. Invoices not paid within fifteen (15) days from the invoice date or other credit period, if applicable, and for which Holaport utiSizes an outside collection agency and/or attorney to effect collections will be subject to a collections handling fee of thirty percent (30%) of the unpaid amount. In addition to the foregoing, payments that are made sixty days (60) after the invoice date are subject to a ten percent (10%) Siquidated damage charge based on the total freight charges of the specific past-due invoice.",
    "The Customer shall not have any right of set-off whatsoever and all invoices raised by Holaport shall be payable in full and without any deduction or setoff whatsoever, other than the deduction of TDS subject to submission of the receipts in a timely manner. Statutory charges if and when appSicabSe, such as Duty, Taxes, GST are payable in full and in advance.",
    "Rates are quoted in the currency Holaport seSected or customer requested, based on the rate of exchange prevailing at the time of submission or mutual agreed. Should the rate of exchange differ from agreed rate of exchange at the time of invoicing, Holaport reserves the right to adjust either the rates or the rate of exchange. All invoices and billing statements are subject to issuance in local currency and local legislation.",

  ], 60, temp1 + 335, {
    // this is how automatic line wrapping will work if the width is specified
    lineGap: 2,
    width: 505,
    paragraphGap: 4,
    bulletIndent: 50,
    listType: 'numbered',
    align: 'left',
    //textIndent: 5,
    bulletRadius: 1, // use this value to almost hide the dots/bullets
  });

  doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
  doc.list([
   "Rate : ",
 ], 50, temp1 + 428, {
   // this is how automatic line wrapping will work if the width is specified
   lineGap: 2,
   width: 505,
   paragraphGap: 4,
   align: 'left',
   listType: 'bullet',
   textIndent: 5,
   bulletRadius: 1, // use this value to almost hide the dots/bullets
 });

 doc.list([
  "The air Freight caScuSation is based on weight or volume rate 1:6, whichever may be higher.",
  "Ocean Freight calculation is based on a weight or volume rate of 1:1, whichever may be higher. Ocean freight rates and surcharges are subject to change at any time.",
  "Trucking tariffs are based on assumption that 1 CBM = 333 kg, and max. length of 270cm. /max. width 180cm./ max. height 150cm max. weight per pc of 500 kg unless otherwise specified.",
  "All ocean rates will be subject to General Rate Increase (GRI), Peak Season Surcharge (PSS), and any additional surcharge type that might be imposed by the carriers. Due to current industry conditions and capacity constraints, pricing is subject to continual change, and Holaport reserves the right to charge capacity surcharges and increase rates. For regulated Sanes, such rates will be pursuant to the applicable published tariff(s).",
  "Rates are services including, but not limited to, inbound collect surcharge, special handling, residential delivery services surcharge, detention, demurrage, fumigation, insurance, storage after free time, customs bond, duties, VAT, taxes, user fees, courier and any other government-mandated fees are excluded from the quote unless otherwise specified.",
  "Rates apply to dry & non-hazardous general cargo, excluding dangerous goods, perishables, valuables, oversized cargo, or parcel cargo unless specified otherwise. Hazardous cargo is subject to shipping line acceptance at the time of booking.",
  "Rates apply only for in-gauge cargo of legal weight and dimensions which may vary as per country.",
  "Rates or services not specified in this quotation will be billed to the customer as receipted.",
  "Customs inspection charges will be applicable if the package is opened for examination & repacked as per orders by a customs authority.",
  "Brokerage accessorial fees may apply if entry characteristics exceed the routine number of Sines of classification, commercial invoices, Bills of  of Lading, or if any additional government agency filings are required.",
  "Outlays for duties, taxes, or freight paid by Holaport on the Customer's behalf are subject to a disbursement fee of 1% (one percent) of the total outstanding amount."
], 60, temp1 + 440, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  bulletIndent: 50,
  listType: 'numbered',
  align: 'left',
  //textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
  doc.list([
   "Custom Duty, Detention and Demurrage Charges : ",
 ], 50, temp1 + 630, {
   // this is how automatic line wrapping will work if the width is specified
   lineGap: 2,
   width: 505,
   paragraphGap: 4,
   align: 'left',
   listType: 'bullet',
   textIndent: 5,
   bulletRadius: 1, // use this value to almost hide the dots/bullets
 });

 doc.list([
  "All charges such as but not limited to Custom duty, demurrage, port congestion fees, layover fees, pre-pull fees and detention charges will be charged at atuals and will be borne by the Customer without any deviation.",
  "Custom Duty, demurrage charges must be paid by Customer in advance, unless Holaport agrees in writing to extend credit to the Customer. The granting of credit to a Customer in connection with a particular transaction shall not be considered a waiver of this provision by Holaport."
], 60, temp1 + 645, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  bulletIndent: 50,
  listType: 'numbered',
  align: 'left',
  //textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

//Content for new page
doc.addPage()
generateHeader(doc);
doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
  doc.list([
   "Packaging : All shipments must be packaged in cartons, crates, or other packaging suitable for transportation or gandling by in accordance with industry standards. Cargo, which is insufficiently prepared, packed or protected will be, at the Customer/consignee sole risk and expense, including risk to third parties and subject to the terms and conditions of the bill of lading. All of Holaport\’s rights and immunities in the event of loss or damage by reason of that insufficient preparation, packaging or protection are hereby expressly reserved. ",
   "General Lien and Right to Sell Customer's Property  : "
 ], 50, temp1 , {
   // this is how automatic line wrapping will work if the width is specified
   lineGap: 2,
   width: 505,
   paragraphGap: 4,
   align: 'left',
   listType: 'bullet',
   textIndent: 5,
   bulletRadius: 1, // use this value to almost hide the dots/bullets
 });

 doc.list([
  " Holaport, shall have a general and continuing lien on any and all property of Customer coming into Holaport\’s actual or constructive possession or control for monies owed to Holaport with regard to the shipment on which the lien is claimed; a prior shipment(s) and/or both;",
  " Holaport, shall provide written notice to Customer of its intent to exercise such lien, the exact amount of monies due and owing, as well as any on-going storage or other charges; Holaport, shall notify all parties having an interest in its shipment(s) of Holaport\’s rights and/or the exercise of such lien."

], 60, temp1 + 45, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  bulletIndent: 50,
  listType: 'numbered',
  align: 'left',
  //textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
  doc.list([
   "Liability : Holaport will not be liable for damage or delays in any form (including, but not limited to, loss of data, indirect damages, consequential loss, pure economic loss, loss of opportunity, loss of revenue or profit, wrongful death, personal injury, property damage, penalties and fines, costs or any other loss) sustained by the Customer, your servants, agents, employees, insurers and third parties for whom you are liable pursuant to any legal relationship, unless you prove that the damage is a direct result of Holaport\’s gross negligence or willful misconduct. The total liability of Holaport shall not exceed the total amount of charges collected by Holaport from the Customer for the individual services performed giving rise to the claim or cause of action.",
   "Engagement of Third Parties : “Third Parties or Third Party” shall include, but not limited to the following - \"carriers, truckmen, cartmen, lightermen, forwarders, OTIs,customs brokers, agents, warehouse men and others to which the goods are entrusted for transportation, cartage, handling and/or delivery and/or storage or otherwise\". Unless services are performed by persons or firms engaged pursuant to express written instructions from you, we shall use reasonable care in our selection of Third Parties, or in selecting the means, route and procedure to be followed in the handling, transportation, clearance and delivery of the shipment. Communication by us that a particular person or firm has been selected to render services with respect to the goods, shall not be construed to mean that we warrant or represent that such person or firm will render such services nor do we assume responsibility or liability for any actions(s) and/or inaction(s) of such Third Parties and/or its agents, and shall not be liable for any delay or loss of any kind due to the negligence of a Third Party or the agent of a Third Party. All claims in connection with the act of a Third Party shall be brought solely against such party and/or its agents; in connection with any such claim, we shall reasonably cooperate with you, who shall be liable for any charges or costs incurred by us.",
   "Quotations Not Binding : Quotations as to fees, rates of duty, freight charges, insurance premiums or other charges given by Holaport, are for informational purposes only and are subject to change without notice. No quotation shall be binding upon Holaport unless Holaport in writing agrees to undertake the handling or transportation of the shipment at a specific rate or amount set forth in the quotation and payment arrangements are agreed to between Holaport and the Customer. Notwithstanding the same, these terms and conditions remain binding on the Customer.",
   "Goods & Service Tax (GST) : Goods & Service Tax, shall apply in addition, on services, as notified by the Government of India, at the rate notified by the Government of India.",
   "Freight Validity : The freight rate will remain valid for a period mentioned by Holaport or for any other stated validity period after which time it will be subject to review. The rate remains subject to any accessorial charges announced by the Holaport during this period.",
   "Surcharges Subject Change : All surcharges are subject to change without prior notice. All applicable surcharges at the time of shipment will apply. Rates quoted are not applicable for shipments that are restricted, high density, odd dimensional, volume, dangerous, perishable or which require special handling.",
   "Additional Charges : The quoted freight rate is exclusive of additional charges and is subject to prevailing accessorial surcharges, Special Equipment Surcharge, Over Dimensional Surcharge. by accepting the Quotation and confirming the Services, the Customer agrees to pay any extra lashings that are required to adequately slow the cargo, by direct payment to the supplier or to Holaport by prior arrangement.",
   " Terms of Quotation : You, as a Customer, agree to pay the amounts presented to you in the final Quotation which is accepted by you and confirmed by Holaport. Further, you, the Customer agree to pay any other amounts that you owe to Holaport in connection with the Service. You also agree to provide any documentation reasonably requested by a Holaport for the purposes of your shipment/Service and you are responsible for the accuracy and timely submission of such documentation to Holaport, whether that occurs through the Xhipment’s digital platform or otherwise. We will use reasonable efforts to ensure that quotes displayed on Xhipment’s digital platform or otherwise are all- inclusive. However, as we have already explained, in addition to these terms and conditions, you may be charged an amount that is additional to the amount as mentioned in the Quotation in certain circumstances. For example, if the truck waits hours for your cargo the truck waits hours for delivery of your cargo at destination or your cargo weighs more than you declared, you will incur extra charges in addition to what appeared in the relevant Quote Similarly, we will disclaim liability for delays caused by force majeure events including weather and strikes. Please note, these are only examples and are not limiting in any manner.",
   " Cancellation : In case of cancellation a cancellation fee shall be applicable. Please contact Holaport for details regarding the cancelation fee.",
   " Indemnity: You will indemnify, defend and hold Holaport and its officers, directors, employee and agents harmless, from and against any claims, disputes, demands, liabilities, damages, losses, and costs and expenses, including, without limitation, reasonable legal and accounting fees arising out of or in any way connected with",
 ], 50, temp1 + 90 , {
   // this is how automatic line wrapping will work if the width is specified
   lineGap: 2,
   width: 505,
   paragraphGap: 4,
   align: 'left',
   listType: 'bullet',
   textIndent: 5,
   bulletRadius: 1, // use this value to almost hide the dots/bullets
 });

 doc.list([
  "your access to or use of Holaport or Holaport digital platform and/ or any services made available by Holaport,",
  "your Customer content, or",
  "your violation of these terms and conditions."
], 60, temp1 + 450, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  bulletIndent: 50,
  listType: 'numbered',
  align: 'left',
  //textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

doc.list([
  " Services of logistics service providers : The Company engages with logistics service providers to provide the requested services to its customers. If you provide any incomplete or wrong or insufficient information or fail to disclose any required information under law, then you are vicariously liable for the acts of the Company. You agree that you shall indemnify and hold us harmless from any and all claims, losses, penalties or other costs resulting from any such default. In addition to that you hereby agree that if any loss incurred by us, either directly or indirectly, due to any default by you, then you are liable for damages towards the Company.",
  " Customer hereby waives all rights of subrogation against Holaport, its officers, members, overseas partners, and employees, arising out of any loss of or damage to goods or property over the course of the shipment or services.",
  " Force Majeure : If at any time Holaport ’s performance is or is likely to be affected by any hindrance or risk of any kind not arising from any fault or neglect of Holaport and beyond the control of Holaport (a \“Force Majeure Event\”) and which cannot be avoided by the exercise of reasonable endeavor, Holaport may be excused from performance only to the extent made necessary by the Force Majeure Event and only for the duration of the Force Majeure Event, at no liability to Holaport or Customer. A party affected by a Force Majeure Event shall notify the other party as soon as possible, and the parties shall work together in good faith to find alternative solutions for continuation of the shipment. Should the Force Majeure Event persist for or exceed 30 consecutive days the Customer shall have the right to cancel the shipment with no liability to Holaport, other than payment incurred for services rendered prior to the Force Majeure Event. Holaport shall use reasonable commercial steps to cooperate with Customer in securing the Shipment and shall assist in its handover to Customer or its designated representative required for the same.",

], 50, temp1 +490, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  align: 'left',
  listType: 'bullet',
  textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

//third page
doc.addPage(),
generateHeader(doc),

doc.fontSize(6).font ("Helvetica").fillColor('#292929'),
doc.list([
   " Special Clauses :"

], 50, temp1 , {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  align: 'left',
  listType: 'bullet',
  textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});

doc.list([
  "Please note that our offer is based on the conditions known at this time, as the logistics industry is severely affected by the Covid-19 pandemic. As a result, there may be an increase in transportation costs, or there may be difficulties that are not known in advance. Of course, we will keep you informed of the circumstances and cost incurred. The additional costs whatever the reason-cannot be covered by Holaport and must be paid by you in accordance with the new/revised quotation and the Holaport’s Standard Terms and Conditions.",
  " For the avoidance of doubt Holaport cannot be held liable in case of any delays and/ or default in the performance of Services as mentioned under the terms and conditions/agreement/quotation/commercials due to any measures taken by, without limitation, public authorities, port authorities, shipping and any other transportation companies due to the Covid-19 virus, and/or any other epidemic or pandemic outbreaks.",
  
  "Holaport shall not be held liable for any damage or any other additional charges that may accrue as a result of an event of Force Majeure, including without limitation storage charges, which shall be fully borne by Customer."
], 60, temp1 +15, {
  // this is how automatic line wrapping will work if the width is specified
  lineGap: 2,
  width: 505,
  paragraphGap: 4,
  bulletIndent: 50,
  listType: 'numbered',
  align: 'left',
  //textIndent: 5,
  bulletRadius: 1, // use this value to almost hide the dots/bullets
});





}

function generateFooter(doc) {
  doc
    .fontSize(8)
    .text(
      "For any queries please reach out at cs@xhipment.com",
      50,
      780,
      { align: "left", width: 500 }
    );
}

function generateHr(doc, y) {
  doc
    .strokeColor("#ff5120")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

module.exports = {
  createInvoice
};
