import '../App.css'
export default function Footerbox() {
    return (
        <>
            <footer>
                <div className="footer-content"><span className="text-background">Tab</span> + <span className="text-background">enter</span> - restart test</div>
                <div className="footer-content"><span className="text-background">esc</span> or <span className="text-background">ctrl</span> + <span className="text-background">shift</span> + <span className="text-background">p</span> - command line</div>
                <div style={{ display: 'flex', justifyContent: "space-between", color: 'var(--nextword)', margin: '10px 10% 20px' }}>
                    <div className="service-help">
                        <span className="service-help-sub">contact</span>
                        <span className="service-help-sub">support</span>
                        <span className="service-help-sub">github</span>
                        <span className="service-help-sub">discord</span>
                        <span className="service-help-sub">twitter</span>
                        <span className="service-help-sub">terms</span>
                        <span className="service-help-sub">security</span>
                        <span className="service-help-sub">privacy</span>
                    </div>
                    <div className="service-help">
                        <span className="service-help-sub">alduin</span>
                        <span className="service-help-sub">v0.0.1</span>
                    </div>
                </div>
            </footer>
        </>
    );
}