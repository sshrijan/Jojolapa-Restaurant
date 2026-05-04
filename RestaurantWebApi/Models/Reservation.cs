namespace RestaurantWebApi.Models
{
    public class Reservation : BaseEntity
    {
        public Guid UserId { get; set; }
        public User User { get; set; }

        public Guid TableId { get; set; }
        public Table Table { get; set; }

        public DateTime ReservationTime { get; set; }
    }
}
