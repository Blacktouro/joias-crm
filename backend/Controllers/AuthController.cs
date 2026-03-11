using Microsoft.AspNetCore.Mvc;
using JoiasCRM.Data;
using JoiasCRM.Models;
using JoiasCRM.DTO;
using BCrypt.Net;

namespace JoiasCRM.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {

        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDTO dto)
        {

            var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = hash,
                BirthDate = dto.BirthDate
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("User criado");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {

            var user = _context.Users
                .FirstOrDefault(u => u.Username == dto.Username);

            if (user == null)
                return Unauthorized();

            bool valid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            if (!valid)
                return Unauthorized();

            return Ok(new { token = "login_ok" });

        }

        [HttpPost("recover")]
        public IActionResult Recover(RecoverDTO dto)
        {

            var user = _context.Users
                .FirstOrDefault(u => u.Email == dto.Email && u.BirthDate == dto.BirthDate);

            if (user == null)
                return BadRequest("Dados inválidos");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            _context.SaveChanges();

            return Ok("Password alterada");
        }
    }
}