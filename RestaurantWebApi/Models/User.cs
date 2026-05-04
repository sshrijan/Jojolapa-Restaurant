using Microsoft.AspNetCore.Identity;
using RestaurantWebApi.Models;

namespace RestaurantWebApi.Models
{
    public class User : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Guid RoleId { get; set; }
        public Role Role { get; set; }
    }
}
