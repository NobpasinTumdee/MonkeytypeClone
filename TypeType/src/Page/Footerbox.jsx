import '../App.css'
export default function Footerbox() {
    return (
        <>
            <footer className="footer-main">
                <div className="footer-content"><span className="text-background">Tab</span> + <span className="text-background">enter</span> - restart test</div>
                <div className="footer-content"><span className="text-background">esc</span> or <span className="text-background">ctrl</span> + <span className="text-background">shift</span> + <span className="text-background">p</span> - command line</div>
                <div style={{ display: 'flex', justifyContent: "space-between", color: 'var(--nextword)', margin: '10px 10% 20px' }}>
                    <div className="service-help">
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>contact</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>support</a>
                        <a className="service-help-sub" href='https://github.com/NobpasinTumdee/MonkeytypeClone'>github</a>
                        <a className="service-help-sub" href='https://discord.gg/mjAbxKhA'>discord</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>twitter</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>terms</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>security</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>privacy</a>
                    </div>
                    <div className="service-help">
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>alduin</a>
                        <a className="service-help-sub" href='https://youtu.be/dQw4w9WgXcQ?si=nMovLBXy3nmyvuxz'>v0.0.1</a>
                    </div>
                </div>
            </footer>
        </>
    );
}