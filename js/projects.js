var pageProjects = {

};
$(document).ready(function() {
    app.setCurrentPage("projects.html");
    var projectConcatString = "";
    var aProjectString = "aProject";
    var collapseString = "collapse";
    var projectDataConcatString = "projectData";
    var j = 0;
    app.db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM projects", [],
            function (tx, r) {
                if(r.rows.length > 0) {
                    projectConcatString += "<div class='panel-group' id='"+aProjectString+"'>";
                    for(var i =0;i< r.rows.length; i++) {
                        projectConcatString += "<div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'>";
                        $.each(r.rows.item(i), function(index, val) {
                            if(val != null) {
                                switch(index) {
                                    case "Name":
                                        projectConcatString += "<a data-toggle='collapse' data-parent='#"+aProjectString+"' href='#"+collapseString+j+"' class='projectHeaderFont'>"+val+"</a></h4></div>";
                                        projectConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'><div class='panel-group' id='"+projectDataConcatString+i+"'>";
                                        j++;
                                        break;
                                    case "Description":
                                        projectConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
                                        projectConcatString += "<a data-toggle='collapse' data-parent='#"+projectDataConcatString+i+"' href='#"+collapseString+j+"' class='projectHeaderFont'>"+index+"</a></h4></div>";
                                        projectConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse in'><div class='panel-body'>"+val+"</div></div></div>";
                                        j++;
                                        break;
                                    case "Phone":
                                        projectConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
                                        projectConcatString += "<a data-toggle='collapse' data-parent='#"+projectDataConcatString+i+"' href='#"+collapseString+j+"' class='projectHeaderFont'>"+index+"</a></h4></div>";
                                        var phoneNumbers = val.split(',');
                                        projectConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>";
                                        for(var i = 0; i < phoneNumbers.length; i++)
											projectConcatString +=  "<a href='tel:"+phoneNumbers[i].trim()+"' class='phoneNumberLink'>"+phoneNumbers[i].trim()+"</a><br/>";
                                        projectConcatString += "</div></div></div>";
                                        j++;
                                        break;
                                    case "Mobile":
                                        projectConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
                                        projectConcatString += "<a data-toggle='collapse' data-parent='#"+projectDataConcatString+i+"' href='#"+collapseString+j+"' class='projectHeaderFont'>"+index+"</a></h4></div>";
                                        var phoneNumbers = val.split(',');
                                        projectConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>";
                                        for(var i = 0; i < phoneNumbers.length; i++)
											projectConcatString +=  "<a href='tel:"+phoneNumbers[i].trim()+"' class='phoneNumberLink'>"+phoneNumbers[i].trim()+"</a><br/>";
                                        projectConcatString += "</div></div></div>";
                                        j++;
                                        break;
                                    case "Location":
                                        projectConcatString += "<div class='panel panel-info'><div class='panel-heading'><h4 class='panel-title'>";
                                        projectConcatString += "<a data-toggle='collapse' data-parent='#"+projectDataConcatString+i+"' href='#"+collapseString+j+"' class='projectHeaderFont'>"+index+"</a></h4></div>";
                                        projectConcatString += "<div id='"+collapseString+j+"' class='panel-collapse collapse'><div class='panel-body'>"+val+"</div></div></div>";
                                        j++;
                                        break;
                                }
                            }
                        });
                        projectConcatString += "</div></div></div>";
                        projectConcatString += "</div><br/>";
                    }
                    projectConcatString += "</div>";
                } else {
                    navigator.notification.alert("No projects available at the moment, come back later.", app.onBackKeyDown, "Out of Stock", 'Go Back');
                }
                $(".homeContent").append(projectConcatString);
                projectConcatString = "";
            },
            app.dbQueryError
        );
    });
});