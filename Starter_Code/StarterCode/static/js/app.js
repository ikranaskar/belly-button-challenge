url ="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


    d3.json(url).then(function(data){
      
       
    });
    


console.log("app.js");






function update(item){
    console.log(item);
  
    d3.json(url).then(function(data) {
      
        let samples = data.samples;
        let sample= samples.filter(obj => obj.id == item);
        let otu_IDs = sample[0].otu_ids;
       
       
        let sample_values=sample[0].sample_values;
       
    
        let otu_labels = sample[0].otu_labels;
       

        
        let trace = {
            x: sample_values.slice(0,10).reverse(),
            text: otu_IDs.slice(0,10).reverse(),
            y:otu_IDs.slice(0,10).map(otu_IDs => `otu ${otu_IDs}`).reverse(),
            type: "bar",
            orientation: 'h'
        };
        
        let tracedata = [trace];
        
        let layout = {
            title: "Top Ten OTUs",
            margin: {t:30,l:150}
        };
        
        Plotly.newPlot("bar",tracedata,layout);

        let trace2 = {
            x: otu_IDs,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color:otu_IDs,
                fillOpacity: .5
            },
            
        } ;

        let tracedata2 = [trace2];
        let layout2 = {
            title: 'Bubble Chart',
            height: 600,
            width: 1200,
        };
        Plotly.newPlot("bubble",tracedata2,layout2);

        let meta1 = data.metadata;
        let metadata = meta1.filter(obj => obj.id == item);
        let result = metadata[0];
        let result2 = result.wfreq;
        
        let panel = d3.select("#sample-metadata");
        panel.html("");
        for (key in result){
            panel.append("h6").text(`${key}: ${result[key]}`);
        };
        
    });

       
};

function init_selector() {
    let drop1 = d3.select("#selDataset"); 
    d3.json(url).then(function(data){
      
        let subjectIDs = data.names;
       
        for (let subjectID of subjectIDs){   
            drop1.append("option")
            .property("value",subjectID)
            .text(subjectID)
            
        }
     update(subjectIDs[0]);
    });
    
    
};


function optionChanged(subjectID) {
    console.log(subjectID);
    update(subjectID);
}


init_selector();