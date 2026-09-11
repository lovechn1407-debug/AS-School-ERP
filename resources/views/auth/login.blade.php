@extends('layouts.login_master')

@section('content')
    <div class="page-content login-cover">

        <!-- Main content -->
        <div class="content-wrapper">

            <!-- Content area -->
            <div class="content d-flex justify-content-center align-items-center">

                <!-- Login card -->
                <form class="login-form" method="post" action="{{ route('login') }}">
                    @csrf
                    <div class="card mb-0 shadow-lg border-0" style="border-radius: 20px; background: rgba(255, 255, 255, 0.98);">
                        <div class="card-body p-4">
                            <div class="text-center mb-4">
                                <div class="d-inline-flex align-items-center justify-content-center bg-indigo-50 text-indigo-600 rounded-circle mb-3" style="width: 64px; height: 64px; background-color: var(--brand-50) !important; color: var(--brand-600) !important;">
                                    <i class="icon-user-lock font-size-xl" style="font-size: 1.75rem;"></i>
                                </div>
                                <h4 class="mb-1 font-weight-bold" style="color: var(--text-main); font-size: 1.35rem;">Welcome Back</h4>
                                <span class="d-block text-muted" style="font-size: 0.875rem;">Sign in to your school management workspace</span>
                            </div>

                            @if ($errors->any())
                            <div class="alert alert-danger border-0 alert-dismissible mb-4">
                                <button type="button" class="close" data-dismiss="alert"><span>&times;</span></button>
                                <span class="font-weight-semibold">Error:</span> {!! implode('<br>', $errors->all()) !!}
                            </div>
                            @endif

                            <div class="form-group position-relative mb-3">
                                <label class="font-weight-medium text-muted small mb-1">Identity</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white border-right-0" style="border-radius: 10px 0 0 10px; border-color: var(--border-strong);"><i class="icon-user text-muted"></i></span>
                                    </div>
                                    <input type="text" class="form-control border-left-0" name="identity" value="{{ old('identity') }}" placeholder="Login ID or Email" required style="border-radius: 0 10px 10px 0;">
                                </div>
                            </div>

                            <div class="form-group position-relative mb-4">
                                <label class="font-weight-medium text-muted small mb-1">Password</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text bg-white border-right-0" style="border-radius: 10px 0 0 10px; border-color: var(--border-strong);"><i class="icon-lock2 text-muted"></i></span>
                                    </div>
                                    <input required name="password" type="password" class="form-control border-left-0" placeholder="{{ __('Password') }}" style="border-radius: 0 10px 10px 0;">
                                </div>
                            </div>

                            <div class="form-group d-flex align-items-center mb-4">
                                <div class="form-check mb-0">
                                    <label class="form-check-label text-muted font-weight-medium" style="font-size: 0.85rem;">
                                        <input type="checkbox" name="remember" class="form-input-styled" {{ old('remember') ? 'checked' : '' }} data-fouc>
                                        Keep me signed in
                                    </label>
                                </div>

                                <a href="{{ route('password.request') }}" class="ml-auto font-weight-semibold" style="font-size: 0.85rem; color: var(--brand-600);">Forgot password?</a>
                            </div>

                            <div class="form-group mb-2">
                                <button type="submit" class="btn btn-primary btn-block py-2 font-weight-bold" style="font-size: 1rem; border-radius: 10px;">Sign in <i class="icon-circle-right2 ml-2"></i></button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>


        </div>

    </div>
    @endsection
