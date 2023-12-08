import { FC } from 'react';
import "./themeSelector.css";

interface ThemeSelectorProps {
    onSelectTheme: (theme: string) => void;
}

const ThemeSelector: FC<ThemeSelectorProps> = ({ onSelectTheme }) => {
    return (
        <div className="theme-selector">
            <button className="theme1" onClick={() => onSelectTheme("theme1")}></button>
            <button className="theme2" onClick={() => onSelectTheme("theme2")}></button>
            <button className="theme3" onClick={() => onSelectTheme("theme3")}></button>
            <button className="theme4" onClick={() => onSelectTheme("theme4")}></button>
            <button className="theme5" onClick={() => onSelectTheme("theme5")}></button>
            <button className="theme6" onClick={() => onSelectTheme("theme6")}></button>
            <button className="theme7" onClick={() => onSelectTheme("theme7")}></button>
        </div>
    );
};

export default ThemeSelector;
