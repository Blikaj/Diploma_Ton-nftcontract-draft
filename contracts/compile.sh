rm build/agitem-code.fif
rm build/agcollection-code.fif

func -o build/agitem-code.fif -SPA ../stdlib.fc params.fc op-codes.fc agitem.fc
func -o build/nft-collection-code.fif -SPA ../stdlib.fc params.fc op-codes.fc agcollection.fc

fift -s build/print-hex.fif