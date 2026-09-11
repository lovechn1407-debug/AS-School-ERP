<div class="navbar navbar-expand-md navbar-dark shadow-sm">
    <div class="d-flex align-items-center mr-4 py-1">
        <a href="{{ route('dashboard') }}" class="d-flex align-items-center text-decoration-none">
            <div class="d-flex align-items-center justify-content-center bg-indigo-400 text-white rounded-lg p-2 mr-2" style="width: 36px; height: 36px; background-color: var(--brand-600) !important; border-radius: 10px;">
                <i class="icon-graduation2 font-size-lg"></i>
            </div>
            <h4 class="text-bold mb-0 font-weight-bold" style="color: var(--text-main) !important; font-size: 1.15rem; font-family: 'Inter', sans-serif;">{{ Qs::getSystemName() }}</h4>
        </a>
    </div>

    <div class="d-md-none">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-mobile">
            <i class="icon-tree5"></i>
        </button>
        <button class="navbar-toggler sidebar-mobile-main-toggle" type="button">
            <i class="icon-paragraph-justify3"></i>
        </button>
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a href="#" class="navbar-nav-link sidebar-control sidebar-main-toggle d-none d-md-block text-muted">
                    <i class="icon-paragraph-justify3"></i>
                </a>
            </li>
        </ul>

        <span class="navbar-text ml-md-3 mr-md-auto"></span>

        <ul class="navbar-nav align-items-center">
            <li class="nav-item dropdown dropdown-user">
                <a href="#" class="navbar-nav-link dropdown-toggle d-flex align-items-center py-1 px-2 rounded-pill" data-toggle="dropdown" style="background-color: var(--bg-subtle); border: 1px solid var(--border-subtle);">
                    <img style="width: 34px; height:34px; object-fit: cover;" src="{{ Auth::user()->photo }}" class="rounded-circle mr-2" alt="photo">
                    <span class="font-weight-semibold mr-1" style="color: var(--text-main);">{{ Auth::user()->name }}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-right shadow-lg border-0">
                    <a href="{{ Qs::userIsStudent() ? route('students.show', Qs::hash(Qs::findStudentRecord(Auth::user()->id)->id)) : route('users.show', Qs::hash(Auth::user()->id)) }}" class="dropdown-item"><i class="icon-user-plus mr-2 text-indigo-400"></i> My profile</a>
                    <div class="dropdown-divider"></div>
                    <a href="{{ route('my_account') }}" class="dropdown-item"><i class="icon-cog5 mr-2 text-muted"></i> Account settings</a>
                    <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();" class="dropdown-item text-danger"><i class="icon-switch2 mr-2 text-danger"></i> Logout</a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </li>
        </ul>
    </div>
</div>
