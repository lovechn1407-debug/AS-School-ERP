<div id="page-header" class="page-header page-header-light mb-3">
    <div class="page-header-content header-elements-md-inline align-items-center">
        <div class="page-title d-flex align-items-center">
            <h4 class="mb-0 font-weight-bold" style="color: var(--text-main); font-size: 1.4rem; letter-spacing: -0.025em;">
                @yield('page_title')
            </h4>
            <a href="#" class="header-elements-toggle text-default d-md-none ml-auto"><i class="icon-more"></i></a>
        </div>

        <div class="header-elements d-none d-md-block">
            <div class="d-flex justify-content-center align-items-center">
                <a href="{{ Qs::userIsSuperAdmin() ? route('settings') : '#' }}" class="btn btn-sm btn-light border rounded-pill px-3 py-1 font-weight-semibold shadow-sm" style="color: var(--brand-700); background-color: var(--brand-50); border-color: var(--brand-100) !important;">
                    <i class="icon-calendar5 mr-2 text-indigo-400"></i> Session: {{ Qs::getSetting('current_session') }}
                </a>
            </div>
        </div>
    </div>
</div>
