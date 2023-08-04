<aside class="main-sidebar darkMode">
    <div class="brand">
        <img alt="logo" src="{{asset('images/logo-white.png')}}" class="brand-logo"/>
        <h2 class="brand-label">
            AGENDA
        </h2>
    </div>
    <div class="sidebar">
        <ul class="metismenu" id="menu">
            <li class="navItem">
                <a href="/" class="navLink {{Request::segment(1) == '' ? 'navLinkActive' : ''}}">
                    <div class="flex items-center justify-start">
                        <div class="navIcon">
                            <i class="fas fa-house"></i>
                        </div>
                        <div class="navText">
                            <p>Beranda</p>
                        </div>
                    </div>
                </a>
            </li>
            <li class="navItem {{Request::segment(1) == 'trans' ? 'mm-active' : ''}}">
                <a class="navLink {{Request::segment(1) == 'trans' ? 'navLinkActive' : ''}}">
                    <div class="flex items-center justify-start">
                        <div class="navIcon">
                            <i class="fas fa-code-branch"></i>
                        </div>
                        <div class="navText">
                            <p>Job & Transaksi</p>
                        </div>
                    </div>
                    <div class="navArrowDown">
                        <i class="fa fa-caret-right"></i>
                    </div>
                </a>
                <ul class="navTreeview">
                    <li class="navItem">
                        <a class="navLink {{Request::segment(1) == 'trans' && Request::segment(2) == 'schedule' ? 'navLinkActive' : ''}}" href="/trans/schedule">
                            <div class="navText">
                                <p>Data Agenda</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="navItem {{Request::segment(1) == 'master' ? 'mm-active' : ''}}">
                <a class="navLink {{Request::segment(1) == 'master' ? 'navLinkActive' : ''}}">
                    <div class="flex items-center justify-start">
                        <div class="navIcon">
                            <i class="fas fa-briefcase"></i>
                        </div>
                        <div class="navText">
                            <p>Master</p>
                        </div>
                    </div>
                    <div class="navArrowDown">
                        <i class="fa fa-caret-right"></i>
                    </div>
                </a>
                <ul class="navTreeview">
                    <li class="navItem">
                        <a class="navLink {{Request::segment(1) == 'master' && Request::segment(2) == 'karyawan' ? 'navLinkActive' : ''}}" href="/master/karyawan">
                            <div class="navText">
                                <p>Data Karyawan</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="navItem {{Request::segment(1) == 'pengaturan' ? 'mm-active' : ''}}">
                <a class="navLink {{Request::segment(1) == 'pengaturan' ? 'navLinkActive' : ''}}">
                    <div class="flex items-center justify-start">
                        <div class="navIcon">
                            <i class="fa fa-user-cog"></i>
                        </div>
                        <div class="navText">
                            <p>Pengaturan</p>
                        </div>
                    </div>
                    <div class="navArrowDown">
                        <i class="fa fa-caret-right"></i>
                    </div>
                </a>
                <ul class="navTreeview">
                    <li class="navItem">
                        <a class="navLink {{Request::segment(1) == 'pengaturan' && Request::segment(2) == 'ganti-password' ? 'navLinkActive' : ''}}" href="/pengaturan/ganti-password">
                            <div class="navText">
                                <p>Ganti Password</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</aside>
