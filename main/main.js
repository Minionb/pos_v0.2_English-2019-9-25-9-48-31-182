'use strict';

function printReceipt(inputs) {
  let AllItemList = decodeItems(inputs);
  printReceiptMessage(AllItemList);
}


function decodeItems(inputs){
  //console.log(inputs);
  let uniqueInput = [];
  let AllItemList = [];
  inputs.forEach((uniqueElement)=>{
    if (!uniqueInput.includes(uniqueElement)){
      uniqueInput.push(uniqueElement);
    }
  });
  uniqueInput.forEach((itemBarCode) =>{
    let count = 0;
    inputs.forEach((inputsElement) => {
    if(itemBarCode == inputsElement){
    count ++;
    }
    
  })
  
  let itemName = getItemName(itemBarCode);
  let itemPrice = getItemPrice(itemBarCode).toFixed(2);
  let itemUnit = "";
  if (count >1){
    itemUnit = getItemUnit(itemBarCode) + "s";
  }
  else{
    itemUnit = getItemUnit(itemBarCode);
  }

  AllItemList.push({itemBarcode: itemBarCode, quantity: count, name: itemName, unit: itemUnit, price: itemPrice});
})

  return AllItemList;
}


function getItemName(itemID){
  let AllItemsInfo = loadAllItems();
  let name = "";
  AllItemsInfo.map(item =>{
    if (itemID == item["barcode"]){
      name = item["name"];
    }
  })
  return name;
}



function getItemUnit(itemID){
  let AllItemsInfo = loadAllItems();
  let unit = "";
  AllItemsInfo.map(item =>{
    if (itemID == item["barcode"]){
      unit = item["unit"];
    }
  })
  return unit;
}


function getItemPrice(itemID){
  let AllItemsInfo = loadAllItems();
  let price ;
  AllItemsInfo.map(item =>{
    if (itemID == item["barcode"]){
      price = item["price"];
    }
  })
  return price;
}

function CalculateSubtotal(item){
  let subtotal = (item["quantity"] * item["price"]).toFixed(2);
  return subtotal;
}


function printReceiptMessage(AllItemList){
  let ReceiptText = "***<store earning no money>Receipt ***\n";
  let total = 0.00;
  let subtotal = 0.00;
  AllItemList.map(item => {
    //subtotal = (item["quantity"] * item["price"]).toFixed(2);
    subtotal = CalculateSubtotal(item);
    ReceiptText += "Name：" + item["name"] +"，Quantity：" + item["quantity"] +" "+ 
    item["unit"] +"，Unit：" + item["price"] + " (yuan)，Subtotal：" + subtotal +" (yuan)\n";
    total += parseInt(subtotal);
  })

  
  ReceiptText += "----------------------\n";
  ReceiptText += "总计：" + String(total.toFixed(2))+ " (yuan)\n";
  ReceiptText += "**********************";

  console.log(ReceiptText);
}
