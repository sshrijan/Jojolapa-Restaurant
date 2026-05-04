namespace RestaurantWebApi.Models
{
    public class OrderItem : BaseEntity
    {
        public Guid OrderId { get; set; }
        public Order Order { get; set; }
        
        public Guid MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; }
        public int Quality { get; set; }
        public decimal Price { get; set; }

    }
}
