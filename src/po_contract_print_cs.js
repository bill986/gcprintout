/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/url'], 
function(currentRecord, url) {
  
    function pageInit(context) {
        
    } 

    function po_contract_print(context) {
      var current_rec = currentRecord.get();

      var scriptUrl = url.resolveScript({
        scriptId: 'customscript_iv_pocontract_print_sl',
        deploymentId: 'customdeploy_iv_pocontract_print_sl',
        returnExternalUrl: false,
        params: {id:current_rec.id}
      });
      
      window.open(scriptUrl, "_blank");

    }

    
  
      return {
        pageInit: pageInit,
        po_contract_print : po_contract_print
      }
  });
  