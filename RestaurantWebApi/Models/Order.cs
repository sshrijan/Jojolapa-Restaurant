namespace RestaurantWebApi.Models
{
    public class Order : BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid BranchId { get; set; }
        public Branch Branch { get; set; }
        public OrderStatus Status { get; set; }
        public decimal TotalAmount { get; set; }
        public ICollection<OrderItem> Items { get; set; }
    }
}
