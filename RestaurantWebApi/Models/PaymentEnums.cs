namespace RestaurantWebApi.Models
{
    public enum PaymentMethod
    {
        Cash,
        Card,
        Esewa,
        Khalti
    }

    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed
    }
}
