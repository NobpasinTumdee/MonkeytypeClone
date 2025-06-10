import GitHubCalendar from 'react-github-calendar';

export default function Profile() {
    return (
        <>
            <GitHubCalendar
                theme={{
                    light: ['#1C1C1C', '#494840', '#827E6A', '#B0AA8C', '#DFD7AF'],
                }}
                username="grubersjoe" />
        </>
    );
}