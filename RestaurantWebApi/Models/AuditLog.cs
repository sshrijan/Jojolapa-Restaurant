namespace RestaurantWebApi.Models
{
    public class AuditLog : BaseEntity
    {
        public Guid Id { get; set; }
        public string Action { get; set; }
        public string EntityName { get; set; }
        
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
