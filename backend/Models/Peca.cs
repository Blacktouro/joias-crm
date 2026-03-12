namespace JoiasCRM.Models
{
    public class Peca
    {
        public int Id { get; set; }

        public int Lote { get; set; }

        public string Descricao { get; set; }

        public string Tipo { get; set; }

        public string Material { get; set; }

        public decimal ValorReal { get; set; }

        public decimal CustoEuro { get; set; }

        public decimal ValorVenda { get; set; }
    }
}