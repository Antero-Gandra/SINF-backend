# Mapping

We use this to keep track of what we're doing with each field

Options:

**NO_IDEA**

The value of this field is known at this point, explicitly (e.g. company name)
**KNOWN**

Copy from the corresponding resource in the other party (e.g. item quantity)
**COPYOVER**

Map over the database through a double-entry subscription table (e.g. sp_item)
**MAP_OVER_DB**

Defaulted after a one-time map over (e.g. discount)
**DEFAULTED**

Ignore this field for now
**IGNORE**

Verify the value of this field is right, then copy it (e.g. price)
**!!VERIFY**

### PURCHASE ORDER --> SALES ORDER

    === === === === ===     THEORETICAL                     CURRENT
                            === === ===                     === === ===
    documentType            DEFAULTED                       DEFAULTED
    serie                   MAP_OVER_DB or IGNORE           IGNORE
    seriesNumber            IGNORE                          IGNORE
    documentDate            -                               -
    buyerCustomerParty      MAP_OVER_DB                     COPYOVER
    accountingParty         DEFAULTED                       IGNORE
    exchangeRate            DEFAULTED                       IGNORE
    discount                DEFAULTED                       IGNORE
    currency                DEFAULTED                       IGNORE
    paymentMethod           IGNORE                          IGNORE
    paymentTerm             IGNORE                          IGNORE
    company                 KNOWN                           KNOWN

    taxIncluded             IGNORE                          IGNORE
    note                    IGNORE                          IGNORE
    remarks                 COPYOVER                        COPYOVER
    loadingPoint            IGNORE                          IGNORE
    unloadingPoint          IGNORE                          IGNORE
    deliveryTerm            IGNORE                          IGNORE

    documentLines {
      description           -                               -
      quantity              COPYOVER                        COPYOVER
      unitPrice             !!VERIFY                        COPYOVER
      deliveryDate          COPYOVER or IGNORE              COPYOVER
      unit                  -                               -
      salesItem             MAP_OVER_DB                     MAP_OVER_DB
      itemTaxSchema         -                               -
    }
    === === === === ===
