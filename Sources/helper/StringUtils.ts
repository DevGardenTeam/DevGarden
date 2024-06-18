export default class DateUtils {
    static isNotNullOrEmpty(str: string | null | undefined): boolean {
        return str !== null && str !== undefined && str.trim() !== '';
    }
}
