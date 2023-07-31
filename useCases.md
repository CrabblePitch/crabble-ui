# Crabble Proof of Concept
This document should contain user stories we aim to support in `Crabble Proof of Concept`. The user stories listed here should include one or more sequence diagrams on below topics;
* User adds their NFT to be rented on the catalog
* User updates renting rules for their on-catalog NFT
* Borrower rents an NFT chosen from the catalog
  * AdHoc
  * Offer
* Borrower returns NFT on time
* Borrower does not return NFT
* Owner withdraws NFT from the protocol
* Owner tries to withdraw rented NFT

> **Important:** Below sequence diagrams do not contain all the uses cases we've implemented in the `CrabbleProtocol`
>. They only show the main functionalities. We should update this document according to the cases we've implemented
> in `CrabbleProtocol` unit tests.

> **Note**: For all the diagrams shown here, we assume that the user has provisioned their smartWallet.

## User add their NFT to be rented on the catalog
```mermaid
sequenceDiagram
    Owner ->> Crabble UI: Clicks registerNFT
    Crabble UI -->> Owner: Opens register NFT page
    Owner ->> Crabble UI: Fills required fields, click "Register NFT"
    note over Owner, Crabble UI: See below for required fields 
    Crabble UI ->> SmartWalletUI: Sends "registerNFT" offer
    note over Crabble UI, SmartWalletUI: offerConfig = { ..., args = requiredFields } 
    SmartWalletUI ->>+ Owner: Asks for user approval
    Owner -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Owner: Asks for signature
    Owner -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks offerArgs valid
    Crabble Contract ->> Crabble Contract: Escrows owner's NFT
    Crabble Contract ->> Crabble Contract: Adds NFT to available rentals list
    Crabble Contract ->> StorageNode: Publishes new catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result

```

## User updates renting rules for their on-catalog NFT
```mermaid
sequenceDiagram
    Owner ->> Crabble UI: Navigates to leased NFTs
    Owner ->> Crabble UI: Choses NFT to edit, clicks "Edit Rules"
    Crabble UI -->> Owner: Opens Edit NFT rules page/dialog
    Owner ->> Crabble UI: Enters new values in desired rules
    Crabble UI ->> SmartWalletUI: Sends "updateRentalAssetRules" offer
    note over Crabble UI, SmartWalletUI: offerConfig = { ..., args = updatedRules } 
    SmartWalletUI ->>+ Owner: Asks for user approval
    Owner -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Owner: Asks for signature
    Owner -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks offerArgs valid
    Crabble Contract ->> Crabble Contract: Finds asset to update
    Crabble Contract ->> Crabble Contract: Updates corresponding renting rules
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

> **Note**: There are three possible borrowing methods listed below, we should make an internal meeting and decide on which one is better, which one to support etc.

## Borrower rents an NFT chosen from the catalog - AdHoc
```mermaid
sequenceDiagram
    Borrower ->> Crabble UI: Opens catalog
    Borrower ->> Crabble UI: Clicks on NFT to rent
    Crabble UI -->> Borrower: Opens NFT renting page/dialog
    Borrower ->> Crabble UI: Enters how long to rent, clicks 'Rent'
    Crabble UI ->> SmartWalletUI: Sends "borrowAsset" offer
    note over Crabble UI, SmartWalletUI: offerConfig = { ..., args = rentingDuration } 
    SmartWalletUI ->>+ Borrower: Asks for user approval
    Borrower -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Borrower: Asks for signature
    Borrower -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks offerArgs valid
    Crabble Contract ->> Crabble Contract: Checks duration isn't greater than owner's max
    Crabble Contract ->> Crabble Contract: Escrows collateral and rental fee
    Crabble Contract ->> Crabble Contract: Transfers NFT to the borrower
    Crabble Contract ->> Crabble Contract: Notifies owner
    note over Crabble Contract: Owner can withdraw rental fee anytime
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

## Borrower rents an NFT chosen from the catalog - Offer
```mermaid
sequenceDiagram
    Borrower ->> Crabble UI: Opens catalog
    Borrower ->> Crabble UI: Clicks on NFT to rent
    Crabble UI -->> Borrower: Opens NFT renting page/dialog
    Borrower ->> Crabble UI: Puts up an offer to rent the asset
    Crabble UI ->> SmartWalletUI: Sends "borrowOffer" offer for chosen asset
    note over Crabble UI, SmartWalletUI: offerConfig = { ..., args = borrowArgs } 
    SmartWalletUI ->>+ Borrower: Asks for user approval
    Borrower -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Borrower: Asks for signature
    Borrower -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks offerArgs valid
    Crabble Contract ->> Crabble Contract: Checks NFT isn't already on rent
    Crabble Contract ->> Crabble Contract: Adds new offer to the activeOffers list
    Crabble Contract ->> Crabble Contract: Transfer a POP to borrower's seat
    Crabble Contract ->>+ Owner: Notifies owner
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
    Owner -->>- Crabble Contract: Owner accpets borrower's offer
    Crabble Contract -->> Borrower: Notifies Borrower = Owner has accepted your offer
    Borrower ->> Crabble UI: Go ahead and borrow the asset
    Crabble UI ->> SmartWalletUI:  Sends "borrowAsset" offer
    SmartWalletUI ->>+ Borrower: Asks for user approval
    Borrower -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Borrower: Asks for signature
    Borrower -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks borrower is approved by the owner
    Crabble Contract ->> Crabble Contract: Escrows Collateral
    Crabble Contract ->> Crabble Contract: Escrows rental fee
    Crabble Contract ->> Owner: Notification = You can withdraw your rental fee
    Crabble Contract ->> Crabble Contract: Transfers NFT to borrowerSeat
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

## Borrower returns NFT on time
```mermaid
sequenceDiagram
    participant Borrower
    participant Crabble UI
    participant SmartWalletUI
    participant Keplr
    participant SmartWallet Contract
    Crabble Contract ->> Crabble Contract: Rental duration up, enter waiting period
    Crabble Contract -->> Borrower: Notification = Time to return NFT
    Borrower ->> Crabble UI: Opens return NFT page
    Borrower ->> Crabble UI: Clicks 'Return'
    Crabble UI ->> SmartWalletUI: Sends "returnAsset" offer
    SmartWalletUI ->>+ Borrower: Asks for user approval
    Borrower -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Borrower: Asks for signature
    Borrower -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Checks NFT is returned in time
    Crabble Contract ->> Crabble Contract: Escrows NFT
    Crabble Contract ->> Crabble Contract: Transfers Collateral back to the borrower
    Crabble Contract ->> Crabble Contract: Notifies owner
    note over Crabble Contract: Owner should withdraw NFT
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

## Borrower does not return NFT
```mermaid
sequenceDiagram
    participant Borrower
    participant Owner
    participant Crabble UI
    participant SmartWalletUI
    participant Keplr
    participant SmartWallet Contract
    Crabble Contract ->> Crabble Contract: Rental duration up, enter waiting period
    Crabble Contract -->> Borrower: Notification = Time to return NFT
    Crabble Contract ->> Crabble Contract: Waiting period ends
    Crabble Contract -->> Owner: Notification = Borrower did not return the NFT, you can withdraw the Collateral
    Owner ->> Crabble UI: Withdraw the Collateral
    Crabble UI ->> SmartWalletUI: Sends "withdrawCollateral" offer
    SmartWalletUI ->>+ Owner: Asks for user approval
    Owner -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Owner: Asks for signature
    Owner -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Transfers Collateral to the Owner
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

## Owner withdraws NFT from the protocol
```mermaid
sequenceDiagram
    participant Owner
    participant Crabble UI
    participant SmartWalletUI
    participant Keplr
    participant SmartWallet Contract
    Owner ->> Crabble UI: Navigates to active NFTs on catalog
    Crabble UI ->> SmartWalletUI: Sends "withdrawAsset" offer
    SmartWalletUI ->>+ Owner: Asks for user approval
    Owner -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Owner: Asks for signature
    Owner -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Transfers NFT to the Owner
    Crabble Contract ->> StorageNode: Publishes updated catalog
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Crabble UI: Notify result
```

## Owner tries withdraw a rented NFT
```mermaid
sequenceDiagram
    participant Owner
    participant Another Channel
    participant SmartWalletUI
    participant Keplr
    participant SmartWallet Contract
    Owner ->> Another Channel: Wants to withdraw asset from the protocol
    Another Channel ->> SmartWalletUI: Sends "withdrawAsset" offer
    SmartWalletUI ->>+ Owner: Asks for user approval
    Owner -->>- SmartWalletUI: User approves from SmartWalletUI Dashboard
    SmartWalletUI ->> Keplr: Serializes offer, sends for signature
    Keplr ->>+ Owner: Asks for signature
    Owner -->>- Keplr: Signs transaction
    Keplr ->> SmartWallet Contract: Sends transaction to chain
    SmartWallet Contract ->> Crabble Contract: Executes offer
    Crabble Contract ->> Crabble Contract: Check Fail = Wanted asset is currently rented
    Crabble Contract ->> Crabble Contract: Does not do any transfer
    StorageNode -->> SmartWalletUI: Notify result
    StorageNode -->> Another Channel: Notify result
```

> **Note**: Our `Crabble UI` should not let the user perform such an action, but I'm going to put this use case here just in case. Should the user tries to interact with the protocol over another channel instead of Crabble UI.
