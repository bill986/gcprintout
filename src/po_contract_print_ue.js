/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define([ 'N/runtime', 'N/ui/serverWidget', 'N/log' , 'N/record' ,  'N/search' ,'N/redirect' ,'N/url'], 
function( runtime, serverWidget, log ,record  ,search , redirect ,url) {

    function beforeLoad(context) {
        var form = context.form;  
        if (context.type === context.UserEventType.VIEW && runtime.executionContext === runtime.ContextType.USER_INTERFACE) {

            form.addButton({
                id: 'custpage_pocontract_print',
                label: "Purchase Contract Print",
                functionName: 'po_contract_print'
            });
        }

        form.clientScriptModulePath = "SuiteScripts/Introv/po_contract_print_cs.js"; 
  
    }

    function beforeSubmit(context) {
            
    }

    function afterSubmit(context) {
       
    }

    

    

    return {
        beforeLoad: beforeLoad,
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    }
});
