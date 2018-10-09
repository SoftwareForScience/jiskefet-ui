import * as m from 'mithril';
import * as $ from 'jquery';
import { NavItem } from './NavItem';

function toggle() {
    $('#menu-toggle').click((e) => {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
    });
}

export class NavBar implements m.Component {

    view() {
        return (
            <nav class="navbar navbar-expand-sm navbar-dark jiskefet-navbar" >
                <div class="container-fluid">
                    <div class="navbar-header w-100 d-flex">
                        <a href="/" class="navbar-brand" oncreate={m.route.link}>
                            <img src="../../assets/cern_logo.png" width="30" height="30" class="d-inline-block align-top logo" alt="" />
                            Jiskefet
                        </a>
                        <button type="button" class="unstyled-button" id="menu-toggle" onclick={toggle}><span class="navbar-toggler-icon" /></button>
                        {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon" />
                        </button> */}
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <NavItem href="/#" name="Login" />
                                <NavItem href="/#" name="Register" />
                            </ul>
                        </div>
                    </div>
                </div>
            </nav >
        );
    }
}
