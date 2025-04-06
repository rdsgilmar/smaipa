
import { Turma } from '@/types/turmas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PenSquare, Trash2 } from 'lucide-react';

interface TurmasListProps {
  turmas: Turma[];
  onEdit: (turma: Turma) => void;
  onDelete: (id: string) => void;
}

const TurmasList = ({ turmas, onEdit, onDelete }: TurmasListProps) => {
  const getTurnoLabel = (turno: Turma['turno']) => {
    const labels = {
      matutino: 'Matutino',
      vespertino: 'Vespertino',
      noturno: 'Noturno',
      integral: 'Integral'
    };
    return labels[turno];
  };
  
  const getTurnoClass = (turno: Turma['turno']) => {
    const classes = {
      matutino: 'bg-blue-100 text-blue-800',
      vespertino: 'bg-orange-100 text-orange-800',
      noturno: 'bg-purple-100 text-purple-800',
      integral: 'bg-green-100 text-green-800'
    };
    return classes[turno];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Turmas</CardTitle>
      </CardHeader>
      <CardContent>
        {turmas.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            Nenhuma turma cadastrada
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Turno</TableHead>
                <TableHead>Escola</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {turmas.map((turma) => (
                <TableRow key={turma.id}>
                  <TableCell className="font-medium">{turma.nome}</TableCell>
                  <TableCell>{turma.ano}º Ano</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTurnoClass(turma.turno)}`}>
                      {getTurnoLabel(turma.turno)}
                    </span>
                  </TableCell>
                  <TableCell>{turma.escola}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(turma)}
                      >
                        <PenSquare className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        onClick={() => onDelete(turma.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TurmasList;
