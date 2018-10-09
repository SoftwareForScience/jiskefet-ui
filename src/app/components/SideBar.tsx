import * as m from 'mithril';
import { NavItem } from './NavItem';

export class SideBar implements m.Component {
    view() {
        return (
            <div class="container-fluid">
                <div id="sidebar-wrapper">
                    <ul class="sidebar-nav">
                        <li class="sidebar-brand">
                            <ul class="mr-auto list-unstyled components">
                                <NavItem href="/logs" name="Logs" />
                                <NavItem href="/runs" name="Runs" />
                                <NavItem href="/logs/create" name="Create new log" />
                                <NavItem href="/runs/create" name="Create new run" />
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>);
    }
}
