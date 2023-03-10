
export default function capitalizeWords(str) {
    if (str != null) {
        return str
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    else {
        return null
    }
};
