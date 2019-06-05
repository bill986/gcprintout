/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

define([ 'N/record', 'N/search', 'N/file', 'N/render', 'N/log', 'N/format', 'N/https', 'N/url', 'N/runtime'],

function( Record, search, file, render, log, format, https, url, runtime) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
    	
        var id = context.request.parameters.id;
        var checktax = context.request.parameters.checktax


        var domain =  url.resolveDomain({ hostType: url.HostType.APPLICATION, accountId: runtime.accountId});
        log.debug('domain',domain)
        
        var output = url.resolveScript({
            scriptId: 'customscript_iv_shipdoc_forinv_run_sl',
            deploymentId: 'customdeploy_iv_shipdoc_forinv_run_sl',
            returnExternalUrl: true,
            params:{
                id: id,
                checktax: checktax
            }
        });

        // log.debug('output',output)

        var response = https.get({ url: output});
        var xmlbody = response.body
		
    	
        var xmlStr = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">'
        xmlStr =  xmlStr + '<pdf>' + xmlbody + '</pdf>' ;

    	context.response.renderPdf({
    		xmlString: xmlStr
    	});
    	
    	return;
    	
	}


	function showAsFloat(n ,fixnum) {
		// return parseFloat(n).toFixed(fixnum);
		var size = Math.pow(10, fixnum);
		var sizex = Math.pow(10, fixnum+1);
		var exec_val = n * sizex / (sizex/size)
	
		return (Math.round(exec_val) / size).toFixed(fixnum);
    }

    function sum_shipbox(shipdoc_no){
        var results = new Array ;
        var customrecord_iv_shipdoc_packageSearchObj = search.create({
            type: "customrecord_iv_shipdoc_package",
            filters:
            [
               ["custrecord_iv_shipdoc_package_shipdoc","anyof",shipdoc_no]
            ],
            columns:
            [
               search.createColumn({
                  name: "custrecord_iv_shipdoc_package_quantity",
                  summary: "SUM",
                  label: "箱數"
               }),
               search.createColumn({
                name: "formulanumeric",
                summary: "SUM",
                formula: "{custrecord_iv_shipdoc_package_quantity} * {custrecord_iv_shipdoc_package_netweight}",
                label: "Formula (Numeric)"
             })
            ]
         });
         customrecord_iv_shipdoc_packageSearchObj.run().each(function(result){
            // .run().each has a limit of 4,000 results
            results.push({
                sum : result.getValue({ name: "custrecord_iv_shipdoc_package_quantity", summary: "SUM",label: "箱數"}),
                weight : result.getValue({ name: "formulanumeric",summary: "SUM", formula: "{custrecord_iv_shipdoc_package_quantity} * {custrecord_iv_shipdoc_package_netweight}",label: "Formula (Numeric)"}),
            })

            return true;
         });

         return results
    }


   

    return {
        onRequest: onRequest
    };
    
});