using Microsoft.AspNetCore.Mvc;

namespace vivace_backend.Controllers
{
    [ApiController]
    [Route("api/joias")]
    public class JoiasController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetJoias()
        {
            var joias = new List<object>
            {
                new { id = 1, nome = "Brinco Ouro", preco = 17.99, stock = 12 },
                new { id = 2, nome = "Colar Luxo", preco = 29.99, stock = 5 },
                new { id = 3, nome = "Anel Premium", preco = 24.99, stock = 8 }
            };

            return Ok(joias);
        }
    }
}