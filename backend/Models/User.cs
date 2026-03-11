using System.ComponentModel.DataAnnotations;

namespace JoiasCRM.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public DateTime BirthDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}