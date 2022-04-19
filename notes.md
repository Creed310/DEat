

* Buyer - Places an Order, sends money to Escrow 
* Delivery - Checks Order and it updates, Selects order, chooses the order, views the GPS coordinates of the Buyer, delivers to them.
(Delay function here, then completes all the phases, once done sends message to Escrow that it can proceed)
* Producer - puts out an order, constantly updates the table. 

Buyer (90% of fee) -> Escrow -> Producer. (triggers when delivered)
Buyer (10% of fee)-> Escrow -> Delivery. (triggers when delivered) //fixed amount

* That is why when on the job, distribution partners have to conduct timely KYC checks and verification.
* A private Hyperledger blockchain solution would store their KYC information, including biometric data.

USPs and Novelty of the application?
* Escrow Payment.
* Tracking.
* KYC Verification.

1. Login Page + (Viewing Blockchain History Page needs to be present)

2. Choose - Producer, Consumer, Delivery.
3. Producer ->
        - KYC Verification.

            * (WORKS) Aadhar verification by going to https://myaadhaar.uidai.gov.in/verifyAadhaar and validating the Aadhar Number by scraping if an error is present.
              (FUTURE) Captcha OCR?  
            * OCR of image of aadhar card + food - https://github.com/dilippuri/Aadhaar-Card-OCR

            - (Later can improve of using the Aadhar API which is available to enterprises) 
        
        - Enter Text Details of Food in form.
        - Geolocation Coordinates gotten. 

4. Consumer ->
        - KYC Verification.

        - looks at table , places order.
        - sends money to escrow. +10% extra delivery fee. 
        - if delivery conditions not met, money sent back to user.
        - match with producer geoloc. nearby orders only shown to user.

available food table DIFFERENT from open orders to deliver table.
delivered orders table -> appended to final blockchain and can be viewed. (assign tags to know which row is delivered order)

5. Delivery ->

        - KYC Verification
                - one page just for aadhar first
                - keep on verifying aadhar.
                - if valid, then push to solidity`

        - initial deposit to register to avoid fraud. deposit returned after certain condition.

        - looks at table, choose order.
        - match with delivery geoloc. nearby orders only shown to delivery.
        - geolocation https://www.youtube.com/watch?v=8KX4_4NK7ZY
        - (for testing purposes) Consumer -> have you received your order button? if yes, 
                                Delivery -> have you delivered your order button? if yes
                                            delay conditions to complete spinners
                                            ack complete and escrow triggers.

        
6. order history can be viewed pertaining to each account.







NEW:

1. window.onload = //name of function()//
- this is to automatically run the function automatically when the page laods.



Huge Modules left:
1. KYC Verification.
2. Location Matching
3. Escrow Contract + Implementation of Test.
4. Tracking.
5. Consensus Button Matching.




Type -> Register -> ifDelivery -> Deposit Contract
Delivery Homepage -> Verify Fee page -> Consumer Details Page + (Consensus Button)