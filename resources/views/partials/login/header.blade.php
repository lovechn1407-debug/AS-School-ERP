<!-- Main navbar -->
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
    </div>

    <div class="collapse navbar-collapse" id="navbar-mobile">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a href="{{ route('login') }}" class="navbar-nav-link text-muted font-weight-semibold">
                    <i class="icon-user-tie mr-1 text-indigo-400"></i> Account Portal
                </a>
            </li>
        </ul>
    </div>
</div>
<!-- /main navbar -->
