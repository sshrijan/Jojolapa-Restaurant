namespace RestaurantWebApi.Models
{
    public class Branch : BaseEntity
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public Guid RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }
    }
}
