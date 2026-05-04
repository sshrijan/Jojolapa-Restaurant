namespace RestaurantWebApi.Models
{
    public class Restaurant : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Branch> Branches { get; set; }
    }
}
