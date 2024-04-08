export const trySaveHighScore = (score: number): boolean => {
    const highScore = getHighScore();
    if (score > highScore) {
        localStorage.setItem('highscore', score.toString());
        return true;
    }
    return false;
}

export const getHighScore = () => {
    return parseInt(localStorage.getItem('highscore') || '0');
}