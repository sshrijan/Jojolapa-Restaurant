namespace RestaurantWebApi.Models
{
    public class Table : BaseEntity
    {
        public string TableNumber { get; set; }
        public int Capacity { get; set; }
        
        public Guid BranchId { get; set; }
        public Branch Branch { get; set; }
    }
}
