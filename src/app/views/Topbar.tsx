import * as m from 'mithril';

export class Topbar implements m.Component {
    view() {
        return (
            <nav class="navbar navbar-expand-sm navbar-light bg-light">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a href="/" className="nav-link" oncreate={m.route.link}>Create new poll</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}