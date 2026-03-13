using System.ComponentModel.DataAnnotations.Schema;

namespace JoiasCRM.Models
{
    public class Peca
    {
        public int Id { get; set; }

        public int Lote { get; set; }

        public string Descricao { get; set; }

        public string Tipo { get; set; }

        public string Material { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal ValorReal { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal CustoEuro { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal ValorVenda { get; set; }
    }
}