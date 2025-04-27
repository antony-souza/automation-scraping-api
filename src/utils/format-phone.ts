export class FormatPhoneWhatsApp {
    public static handler(phone: string): string {
        const cleaned = phone.replace(/\D/g, '');
        const withDdi = cleaned.startsWith("55") ? cleaned : `55${cleaned}@c.us`;
        return withDdi;
    }
}