<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>LMS | Student</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="icon" href="../_viewfiles/images/logo.png">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../_viewfiles/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../_viewfiles/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../_viewfiles/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../_viewfiles/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../_viewfiles/css/_all-skins.min.css">
  <!-- Morris chart -->
  <link rel="stylesheet" href="../_viewfiles/css/morris.css">
  <!-- jvectormap -->
  <link rel="stylesheet" href="../_viewfiles/css/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="../_viewfiles/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../_viewfiles/css/daterangepicker.css">
    <link rel="stylesheet" href="../_viewfiles/css/mystyle.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <!--<link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">-->

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <style>
        .li-highlight{
            background:#D73846;
            background-image: linear-gradient(#FFDEAD, #f39c12, #FFDEAD);
            /*background-image: radial-gradient(#f39c12 5%, #F39C5B 15%, #f39c12 60%);*/
        }
        .li-highlight a{
            background:none !important;
        }

        .box-header {
            background: #FFCA59;
            border-radius: 4px 4px 0px 0px;
            margin-bottom: 15px;
            box-shadow: 0px 7px 11px #ccc
        }
    </style>
</head>
<body class="hold-transition skin-yellow-light sidebar-mini">
<!--<div class="alert alert-warning alert-dismissible text-center Message" style="margin-bottom: 0px;">
    <h4><i class="icon fa fa-bullhorn"></i>IMPORTANT NOTICE: Dear Student(s), Due to server upgrades LMS services will be unavailable from 12:30am-2:30am on 26 June, 2020.</h4>
</div>-->
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="index.php" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b><img src="../_viewfiles/images/logo.png"></b></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg" style="font-size: 18px; font-weight: bold"><b><img src="../_viewfiles/images/logo.png"></b>Bahria University</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

        <h4 class="text-center col-xs-8 text-bold " style="color: #fff; font-size: 24px;">Learning Management System</h4>
        <h5 class="text-center col-xs-1" style="color:#fff; font-size:16px; background:#3C8D27; border:1px solid black; border-radius:20px;
    box-shadow: 1px 1px 4px 2px black; line-height: 25px;">
            <div id="loadServerTime">
                01:24 AM            </div>
        </h5>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- Messages: style can be found in dropdown.less-->

          <!-- Notifications: style can be found in dropdown.less -->
          <li class="dropdown notifications-menu">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-bell-o"></i>
                    <span class="label label-warning" title="">
                                            </span>
                </a>
                <ul class="dropdown-menu">
                                            <li>
                          <!-- inner menu: contains the actual data -->
                            <ul class="menu">
                                <li><a href="#"><i class="fa fa-warning text-yellow"></i> No Notifications Yet </a></li>
                            </ul>
                        </li>
                                        <!--<li class="footer"><a href="#">View all</a></li>-->
                </ul>
                
            </li>

          <!-- User Account: style can be found in dropdown.less -->
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
              <img src="../_viewfiles/images/person.png" class="user-image" alt="User Image">
              <span class="hidden-xs">ABDUR RAFAY</span>
            </a>
            <ul class="dropdown-menu" style="width: 220px;">
              <!-- User image -->
              <li class="user-header">
                <img src="../_viewfiles/images/person.png" class="img-circle" alt="User Image"/>
                <p>
                    01-136242-004<br>ABDUR RAFAY                  <!--<small>Member since Nov. 2012</small>-->
                </p>
              </li>

              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="pull-left"></div>
                <div class="pull-right">
                  <a href="../Student/includes/studentprocess.php?s=signout" class="btn btn-default btn-flat">Sign out</a>
                </div>
              </li>
            </ul>
          </li>

        </ul>
        <!-- Control Sidebar Toggle Button -->
        
      </div>
    </nav>
  </header>  <!-- Left side column. contains the logo and sidebar -->
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">

      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="active">
          <a href="Dashboard.php">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>

          <li>
              <a href="CourseOutline.php">
                  <i class="fa fa-bars"></i> <span>Course Outline</span>
              </a>
          </li>
          <li>
              <a href="CoursePlan.php">
                  <i class="fa fa-file-text-o"></i> <span>Course Plan</span>
              </a>
          </li>

          <li>
              <a href="LectureNotes.php">
                  <i class="fa fa-th"></i> <span>Lecture Notes</span>
              </a>
          </li>

          <li>
              <a href="Assignments.php">
                  <i class="fa fa-files-o"></i> <span>Assignments</span>
              </a>
          </li>

          <li>
              <a href="Quizzes.php">
                  <i class="fa fa-building-o"></i> <span>Quizzes</span>
              </a>
          </li>

          <li>
              <a href="Miscellaneous.php">
                  <i class="fa fa-object-group"></i> <span>Miscellaneous</span>
              </a>
          </li>

          <li>
              <a href="Papers.php">
                  <i class="fa fa-object-group"></i> <span>Papers</span>
              </a>
          </li>

          <li>
              <a href="Announcements.php">
                  <i class="fa fa-bullhorn"></i> <span>Announcements</span>
              </a>
          </li>

          <li>
              <a href="Guidelines.php">
                  <i class="fa fa-object-group"></i> <span>Guidelines</span>
              </a>
          </li>

          <li>
              <a href="OnlineLibraryResources.php">
                  <i class="fa fa-life-saver"></i> <span>Online Library Resources</span>
              </a>
          </li>

          <li>
              <a href="FAQ.php">
                  <i class="fa fa-list"></i> <span>FAQs</span>
              </a>
          </li>

     
          <li>
              <a href="UnderstandingQuran.php">
                  <i class="fa fa-fw fa-list-ul"></i> <span>Understanding Quran</span>
              </a>
          </li>

      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1 class="bg-gray pad">
        Dashboard
        <small></small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
        <!--<div class="row">
            <div class="col-lg-12 col-xs-12">
                <h1 class="text-orange text-bold" style="font-size:22px">***For BUKC Students: "Bahria University Students Study and Cultural Tour to Turkiye (18 - 28 Aug 2024) - Apply now at <a href="https://int.bahria.edu.pk" target="_blank">https://int.bahria.edu.pk</a>".</h1>
            </div>
        </div>-->
        <div class="row">
            <div class="col-xs-12">
                <div class="box">

                    <div class="box-header">
                        <div class="col-lg-3"> <h3 class="box-title">Courses Registered</h3></div>
                        <div class="col-lg-8">
                            <div class="col-xs-1"> Semester: </div>
                            <div class="col-xs-6">
                                <form action="#" method="post">
                                    <select name="semesterName" id="semesterId" class="form-control" onchange="SelectSemester()" >
                                                                                        <option value="MjAyNjE%3D"
                                                     >
                                                    Spring-2026                                                </option>
                                                                                                <option value="MjAyNTM%3D"
                                                     >
                                                    Fall-2025                                                </option>
                                                                                                <option value="MjAyNTI%3D"
                                                     >
                                                    Summer-2025                                                </option>
                                                                                                <option value="MjAyNTE%3D"
                                                     >
                                                    Spring-2025                                                </option>
                                                                                                <option value="MjAyNDM%3D"
                                                     >
                                                    Fall-2024                                                </option>
                                                                                                <option value="MjAyNDI%3D"
                                                     >
                                                    Summer-2024                                                </option>
                                                                                                <option value="MjAyNDE%3D"
                                                     >
                                                    Spring-2024                                                </option>
                                                                                                <option value="MjAyMzM%3D"
                                                     >
                                                    Fall-2023                                                </option>
                                                                                                <option value="MjAyMzI%3D"
                                                     >
                                                    Summer-2023                                                </option>
                                                                                                <option value="MjAyMzE%3D"
                                                     >
                                                    Spring-2023                                                </option>
                                                                                                <option value="MjAyMjM%3D"
                                                     >
                                                    Fall-2022                                                </option>
                                                                                                <option value="MjAyMjI%3D"
                                                     >
                                                    Summer-2022                                                </option>
                                                                                                <option value="MjAyMjE%3D"
                                                     >
                                                    Spring-2022                                                </option>
                                                                                                <option value="MjAyMTM%3D"
                                                     >
                                                    Fall-2021                                                </option>
                                                                                                <option value="MjAyMTI%3D"
                                                     >
                                                    Summer-2021                                                </option>
                                                                                                <option value="MjAyMTE%3D"
                                                     >
                                                    Spring-2021                                                </option>
                                                                                                <option value="MjAyMDM%3D"
                                                     >
                                                    Fall-2020                                                </option>
                                                                                                <option value="MjAyMDI%3D"
                                                     >
                                                    Summer-2020                                                </option>
                                                                                                <option value="MjAyMDE%3D"
                                                     >
                                                    Spring-2020                                                </option>
                                                                                                <option value="MjAxOTM%3D"
                                                     >
                                                    Fall-2019                                                </option>
                                                                                    </select>
                                </form>
                            </div>
                        </div>
                        <!--<div class="text-orange text-bold" style="font-size:22px">***IMPORTANT ANNOUNCEMENT: Some features of dashbord are disabled temporarily .</div>-->
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
                        <table class="table table-hover">
                            <tbody>
                            <tr>
                                <th width="5%">Sr.No.</th>
                                <th width="20%">Course Title</th>
                                <th width="20%">Class</th>
                                <th width="20%">Semester</th>
                                <!--<th width="15%">Announcement<br/><small>(Latest one)</small></th>-->
                                <!--<th width="15%">Lectures</th>
                                <th width="15%">Assignments</th>
                                <th width="15%">Quizzes</th>-->
                            </tr>
                                                                                    <tr>
                                <td>1 </td>
                                <td>Data Communication and Networking </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>2 </td>
                                <td>Data Communication and Networking Lab </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>3 </td>
                                <td>Artificial Intelligence </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>4 </td>
                                <td>Artificial Intelligence Lab </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>5 </td>
                                <td>Database Management Systems </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>6 </td>
                                <td>Database Management Systems Lab </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>7 </td>
                                <td>Entrepreneurship </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>8 </td>
                                <td>Introduction to Psychology </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                <tr>
                                <td>9 </td>
                                <td>Understanding Quran-III </td>
                                <td>BS (AI)-4 (A) Morning </td>
                                <td>Spring-2026 </td>
                                <!--<td>
                                    <span class="fa fa-bullhorn"></span>
                                    <small class="label label-info" title="">
                                        Hover to View</small>
                                </td>-->
                                <!--<td>
                                    <span class="label label-success">
                                                                            </span>
                                </td>
                                <td title="Submitted/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>
                                <td title="Taken/Total">
                                    <span class="label label-success">
                                                                        </span>
                                </td>-->
                            </tr>
                                                                                                </tbody>
                        </table>
                    </div>

                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>
        <div class="text-red">* Courses from CMS will be available here after 1 hour.</div>
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <!--<b>Version</b> 1.0-->
    </div>
    <strong>Copyright &copy; 2026 <a href="https://www.bahria.edu.pk" target="_blank">Bahria University</a>.</strong> All rights
    reserved.
  </footer>

</div>
<!-- ./wrapper -->

  <script>
      function SelectSemester()
      {
          var semesterIdValue = semesterId.options[semesterId.selectedIndex].value;
          var currentURL = location.protocol + '//' + location.host + location.pathname;
          window.location.href = currentURL + "?s=" + semesterIdValue;
      }

      function GetCourses() {
          var semesterIdValue = semesterId.options[semesterId.selectedIndex].value;
          var courseId = document.getElementById("courseId");
          var courseIdValue = courseId.options[courseId.selectedIndex].value;
          var currentURL = location.protocol + '//' + location.host + location.pathname;
          window.location.href = currentURL + "?s=" + semesterIdValue +"&oc=" + courseIdValue;
      }

      function Downloaded123() {
          alert("Downloaded");
      }
  </script>

<!-- jQuery 3 -->
<script src="../_viewfiles/js/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../_viewfiles/js/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="../_viewfiles/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="../_viewfiles/js/raphael.min.js"></script>
<script src="../_viewfiles/js/morris.min.js"></script>
<!-- Sparkline -->
<script src="../_viewfiles/js/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../_viewfiles/js/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../_viewfiles/js/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../_viewfiles/js/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../_viewfiles/js/moment.min.js"></script>

<script src="../_viewfiles/js/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../_viewfiles/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<!-- <script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script> -->
<!-- Slimscroll -->
<script src="../_viewfiles/js/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../_viewfiles/js/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../_viewfiles/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="js/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<!-- <script src="js/demo.js"></script> -->

<script>
      $(document).ready(function(){
          var url = window.location;
          //alert(url);
          $('ul.sidebar-menu a').filter(function() {
              return this.href == url;
          }).parent().addClass('li-highlight');
          $('ul.treeview-menu a').filter(function() {
              return this.href == url;
          }).parentsUntil("ul.sidebar-menu > .treeview-menu").addClass('active');
      });
  </Script>

</body>
</html>
