<div class="wrapper sm:sidebar-collapsed sidebar-mini">
    <nav class="nav-bar main-header">
        <div class="header-container">
            <div class="flex">
                <div class="p-[10px] ml-[5px] cursor-pointer toggle-sidebar">
                    <i class="fas fa-bars"></i>
                </div>
            </div>

            <div class="flex items-center">
                <div class="py-[10px] px-[15px] relative cursor-pointer toggle-notif">
                    <div class="absolute top-[2px] right-[0px] data-count-notif hidden">
                        <div class="inline-flex justify-center items-center text-xs text-white bg-[#f66e6e] rounded-full min-w-[18px] h-[18px] p-[5px]">
                            <span class="count-notif"></span>
                        </div>
                    </div>
                    <i class="far fa-bell text-[20px]"></i>
                </div>
                <div class="p-[10px]">
                    <button id="dropdownAvatarButton" data-dropdown-toggle="dropdownAvatar" data-dropdown-offset-skidding="-60" class="dropdown-button" type="button">
                        <span class="sr-only">Open user menu</span>
                        <div class="avatar">
                            <span>{{ substr(Auth::user()->name, 0, 1)}}</span>
                        </div>
                    </button>

                    <div id="dropdownAvatar" class="dropdown-panel w-[250px]">
                        <div class="dropdown-header">
                            <div class="font-medium truncate">
                                {{ Helper::singkatNama(Auth::user()->name, 2) }}
                            </div>
                            <div class="truncate">{{Auth::user()->email}}</div>
                        </div>
                        <ul aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                            <li>
                                <a href="/">Dashboard</a>
                            </li>
                            <li>
                                <a href="/pengaturan/ganti-password">Ganti Password</a>
                            </li>
                        </ul>
                        <div class="dropdown-footer">
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <a href="javascript:void(0)" onclick="event.preventDefault(); this.closest('form').submit();">Logout</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    @include('layouts.sidebar')
    @include('layouts.notif')
    <div class="content-wrapper">
        {{$slot}}
    </div>
    <footer class="footer-menu">
        <div>
            Agenda @2023
        </div>
        <div>
            Powered by ID SURVEY
        </div>
    </footer>
    <div class="sidebar-overlay"></div>
    <div class="notifbar-overlay"></div>
</div>
