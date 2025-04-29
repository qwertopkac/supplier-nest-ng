import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { ContextMenu } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { NodeService } from '../../../core/service/nodeservice';

@Component({
    selector: 'app-supplier-filter',
    standalone: true,
    imports: [ TreeModule,ContextMenu,ToastModule],
    templateUrl: './supplier-filter.component.html',
    styleUrl: './supplier-filter.component.scss',
})
export class SupplierFilterComponent implements OnInit {
    files!: TreeNode[];

    selectedFiles!: TreeNode[];

    constructor(private nodeService: NodeService) {}


    ngOnInit() {
        this.nodeService.getFiles().then((data) => (this.files = data));
        setTimeout(() => {
        this.expandAll();

        }, 1);
    }

    expandAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, true);
        });
    }

    collapseAll() {
        this.files.forEach((node) => {
            this.expandRecursive(node, false);
        });
    }

    private expandRecursive(node: TreeNode, isExpand: boolean) {
        node.expanded = isExpand;
        if (node.children) {
            node.children.forEach((childNode) => {
                this.expandRecursive(childNode, isExpand);
            });
        }
    }
}
