<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>
<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
    <!-- Vendor styles -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link href="../Content/bootstrap.min.css" rel="stylesheet" />
    <link href="../Content/bootstrap-theme.css" rel="stylesheet" />
    <link href="../ss_styles/ss_style.css" rel="stylesheet" />
    <!-- Vendor javascript -->
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>
    <script src="../Scripts/angular.js"></script>
    <script src="../Scripts/bootstrap.min.js"></script>
    <!-- Custom javascript -->
    <script src="../ss_scripts/ssApp.js"></script>
    <script src="../ss_scripts/ssController.js"></script>
    <script src="../ss_scripts/ssConfigs.js"></script>
    <script src="../ss_scripts/ssTable.js"></script>
    <script src="../Scripts/angular-sanitize.min.js"></script>
    <script src="../Scripts/angular-route.min.js"></script>
    <!-- <script src="../Scripts/angular-ui-router.min.js"></script> -->
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <section data-ng-app="ssListApp" class="list-wrapper">

           <!-- Modal windows -->
           <div class="container"></div>

    <div id="wrapper">

        <!-- Sidebar -->
        <div id="sidebar-wrapper" >
            <ul class="sidebar-nav">
                <li class="sidebar-brand">
                    <a href="#" ">
                        Lists
                    </a>
                </li>
                <li class="search">
                    <input type="text" class="form-control"  placeholder="Search: "/>
                </li>
                <!--
                <li>
                    <a ui-sref="listState1">1st LIST</a>
                </li>
                <li>
                    <a ui-sref="listState2">2nd LIST</a>
                </li>
                <li>
                    <a ui-sref="listState3">3rd LIST</a>
                </li>
                <li>
                    <a ui-sref="listState4">4th LIST</a>
                </li>
                    -->

                <li>
                    <a href="#/">1st LIST</a>
                </li>
                <li>
                    <a href="#/lists1">2nd LIST</a>
                </li>
                <li>
                    <a href="#/{{tasks.title}}">3rd LIST</a>
                </li>
                <li>
                    <a href="#/lists3">4th LIST</a>
                </li>

            </ul>
        </div>
        <!-- /#sidebar-wrapper -->
        
        <!-- Page Content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <input type="text" class="modal-search form-control placeholder="Find Valdo"/>
                        <button  type="button" class="modal-button btn btn-primary " >
                          <span class="glyphicon glyphicon-th-list"></span>
                        </button>

                        <!-- BEGIN display list table -->
                        <div ng-view></div>
                        <!-- END display list table -->

                        <!-- modal content -->
                         <!-- table contents -->
                        <a href="#menu-toggle" class="btn btn-default" id="menu-toggle">Toggle Menu</a>
                    </div>
                </div>
            </div>

        </div>
        <!-- /#page-content-wrapper -->
    </div>

    <!-- /#wrapper -->
           
    </section>
    <script>
        $("#menu-toggle").click(function (e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
        });
    </script>

</asp:Content>
